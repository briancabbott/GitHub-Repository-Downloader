This is the auto job canceller.

For any workflow in CircleCI that has been on hold - aka waiting for a human to approve it - cancel it.

We have a variety of sub scripts in here:

  * `long_job_canceller.py`: cancels any Circle job that's too old, warning people when it gets middle-aged
  * `main_is_borked.py`: is main b0rked? Ping our on call staff and the person who authored the latest commit...
