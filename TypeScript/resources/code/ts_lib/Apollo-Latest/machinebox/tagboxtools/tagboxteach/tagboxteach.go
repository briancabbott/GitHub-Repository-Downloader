package main

import (
	"context"
	"flag"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/machinebox/sdk-go/boxutil"
	"github.com/machinebox/sdk-go/tagbox"
)

func main() {
	var (
		dir        = flag.String("dir", "./testdata", "source directory")
		tagboxAddr = flag.String("tagbox", "http://localhost:8080", "tagbox address")
	)
	flag.Parse()

	// make a new tagbox client
	tagboxClient := tagbox.New(*tagboxAddr)

	log.Println("waiting for box to be ready...")
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	err := boxutil.WaitForReady(ctx, tagboxClient)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("box ready")

	log.Println("Walk")

	filepath.Walk(*dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		ll := strings.ToLower(info.Name())
		if !strings.HasSuffix(ll, ".jpg") && !strings.HasSuffix(ll, ".jpeg") && !strings.HasSuffix(ll, ".png") {
			return nil
		}
		parts := strings.Split(path, string(filepath.Separator))
		if len(parts) < 2 {
			return nil
		}
		name := parts[len(parts)-2]
		name = strings.Replace(name, "_", " ", -1)
		log.Printf("+ Teach: %v (%v)\n", name, info.Name())
		err = teachFromFile(tagboxClient, path, name, info.Name())
		if err != nil {
			log.Println("[ERROR]: Teaching", err)
			return nil
		}
		return nil
	})
}

func teachFromFile(tagboxClient *tagbox.Client, path, tag, filename string) error {
	r, err := os.Open(path)
	if err != nil {
		return err
	}
	defer r.Close()
	err = tagboxClient.Teach(r, strings.Replace(tag, " ", "_", -1)+"_"+filename, tag)
	if err != nil {
		return err
	}
	return nil
}
