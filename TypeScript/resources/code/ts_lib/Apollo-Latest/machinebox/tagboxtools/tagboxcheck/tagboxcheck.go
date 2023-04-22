package main

import (
	"log"
	"os"
	"path/filepath"
	"strings"

	"flag"

	"github.com/machinebox/sdk-go/tagbox"
)

func main() {
	var (
		dir        = flag.String("dir", "./testdata", "source directory")
		tagboxAddr = flag.String("tagbox", "http://localhost:8080", "tagbox address")
		images     = flag.String("images", ".jpg", "image files extension")
	)
	flag.Parse()

	tagboxClient := tagbox.New(*tagboxAddr)

	filepath.Walk(*dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		if !strings.HasSuffix(info.Name(), *images) {
			return nil
		}
		parts := strings.Split(path, string(filepath.Separator))
		if len(parts) < 2 {
			return nil
		}
		log.Printf("+ %v\n", info.Name())
		tags, err := tag(tagboxClient, path)
		if err != nil {
			log.Println("[ERROR]: Tagging", err)
			return nil
		}
		for _, tag := range tags {
			log.Printf("\t%v\n", tag)
		}
		return nil
	})
}

func tag(tagboxClient *tagbox.Client, path string) ([]string, error) {
	tags := []string{}
	r, err := os.Open(path)
	if err != nil {
		return tags, err
	}
	defer r.Close()
	resp, err := tagboxClient.Check(r)
	if err != nil {
		return tags, err
	}
	for _, tag := range resp.CustomTags {
		tags = append(tags, tag.Tag)
	}
	return tags, nil
}
