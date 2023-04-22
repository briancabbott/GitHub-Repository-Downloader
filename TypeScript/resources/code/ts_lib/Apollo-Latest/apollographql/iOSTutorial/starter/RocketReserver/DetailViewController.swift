//
//  DetailViewController.swift
//  RocketReserver
//
//  Created by Ellen Shapiro on 11/13/19.
//  Copyright © 2019 Apollo GraphQL. All rights reserved.
//

import UIKit
import Apollo

class DetailViewController: UIViewController {
    
    @IBOutlet private var missionPatchImageView: UIImageView!
    @IBOutlet private var missionNameLabel: UILabel!
    @IBOutlet private var rocketNameLabel: UILabel!
    @IBOutlet private var launchSiteLabel: UILabel!
    @IBOutlet private var bookCancelButton: UIBarButtonItem!
    
    var launchID: GraphQLID? {
      didSet {
        self.configureView()
      }
    }
    
    func configureView() {
        guard
            self.missionNameLabel != nil else {
                return
        }
        
        self.missionNameLabel.text = "Placeholder"
        // TODO: Update UI based on Launch details
        // TODO: Adjust UI based on whether a trip is booked or not
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.configureView()
    }
    
    private func loadLaunchDetails() {
        // TODO: Actually load launch details
    }
    
    @IBAction private func bookOrCancelTapped() {
        // TODO: Figure out if a trip should be booked or cancelled
    }
    
    private func bookTrip(with id: GraphQLID) {
       // TODO: Add code to book trip
    }
    
    private func cancelTrip(with id: GraphQLID) {
      // TODO: Add code to cancel trip
    }
    
    private func isLoggedIn() -> Bool {
      // TODO: Add code to validate the user is logged in
      return false
    }
}

