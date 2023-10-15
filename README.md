# Google_Service_Accounts_

This is a process for calling Google Business Profile API's using a service account WITHOUT having to enable domain-wide delegation.

This is achieved by granting the Service Account access as a Manager from the Business Profile Manager UI.  It is easy enough to add the Service Account on the BPM UI by clicking on Group Settings -> Manage Users -> Add Users but then it will show the Service Account as invited and there is no way to retrieve that invite to accept it from any UI...but you can do it with the API.

Once the Service Account is invited to be a manager of the Group in BPM, you can use the Account Management API to accept the invite with this sequence:

**accounts.list** - Retrieve the Account_ID for the Service Account from the Log.

**accounts.invitations.list** - Use Account_ID from previous step in the query string. In the Log you will see the Invitation ID of the pending invite.

**accounts.invitations.accept** - Use Invitation_ID from previous step in the query string.
This will accept the invitation and you can confirm it worked on the BPM UI by clicking on group settings again.

Once I did that, I was able to use the Service Account to run a single script that retrieved all reviews from 51 different locations based on the group access and without using Domain-Wide Delegation .
