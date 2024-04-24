# Hosting Handover

## Sanity Webhook

We have setup the sanity.io to trigger github action when editor publishes the content. In order that to work, you will need to update webhook settings on Sanity.

- Go to Firefly Sanity Organization: Navigate to the Firefly Sanity organization by following this link:https://www.sanity.io/organizations/ocOdwiaPP/project/xgbrv2vi

- Access API Settings: Once you're on the project page, locate and click on the "API" tab. This should take you to the settings related to the API and webhooks.

- Find Webhooks Section: Within the API settings, locate the section related to webhooks. It should be labeled as such.

- Edit Webhook: In the webhooks section, you should find an option to "Edit webhook". Click on this to proceed.

- Update URL Field: Once you're in the editing mode, locate the URL field. Update this field to match the dispatch URL of your repository. It should look something like this: https://api.github.com/repos/[owner]/[repository-name]/dispatches. Make sure to replace [owner] and [repository-name] with the appropriate values for your GitHub repository.

- Update Authorization Token: In the HTTP headers section, you'll likely find a field for "Authorization" token. Replace the existing token with your personal access token from GitHub. Make sure to have "Bearer" in front of token you added. You can generate a personal access token by following this link: https://github.com/settings/tokens

- Save Changes: Once you've made the necessary updates, don't forget to press the "save" button to save your changes.

### test

- Navigate to Sanity Studio: Go to the Sanity Studio interface by following this link: [Firefly Health Sanity Studio](https://fireflyhealth.sanity.studio/production/structure).

- Access Deploy Section: Once you're in the Sanity Studio, scroll down on the left content list until you find the "Deploy" section. Click on it to access the deploy document.

- Set Deploy Request Datetime: Within the deploy document, locate the field labeled "Deploy Request Datetime". Click on the calendar icon next to it, and then select "Set to current time". This action will automatically set the datetime field to the current time.

- Publish the Document: After setting the datetime field, click on the "Publish" button to publish the deploy document with the current datetime.

- Observe GitHub Action: After publishing the document, you should observe that a GitHub action is triggered. You can monitor the GitHub repository to see the action being executed.

- Check for Pull Request: Once the GitHub action workflow is completed, you should see a pull request being generated in your repository with the newly generated content. You can review the pull request to verify that everything is as expected.

## AWS

### Step 1: Set up new S3 bucket

- Create a new S3 bucket. In the initial "Create bucket" form, leave all of
  the default settings the same, except for the public access. Under the
  `Block Public Access settings for this bucket` header, uncheck the box
  labeled `Block all public access`, and check the additional confirmation.
  We need the bucket to be public in order to access the files from Cloudfront.

- Once the new bucket is created, open it to edit its settings.

- Under the `Properties` tab, scroll down to find `Static website hosting`.
  Click `Edit` on the right side, then select the `Enable` radio button.
  Make sure `Index document` points to `index.html`. Save these settings.

- Under the `Permissions` tab, make sure the bucket is marked for public access.
  Then scroll down to the `Bucket policy` section and enter the following JSON.
  (Make sure to replace `BUCKET NAME` with your actual bucket name.)
  This allows us to read the contents of the bucket without requiring expiring
  tokens to be appended to the request URLs.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<BUCKET NAME>/*"
    }
  ]
}
```

### Step 2: Set up Cloudfront

- Next navigate to the Cloudfront section of the AWS console.

- Click the `Create distribution` button.

- For the `Origin domain` field, enter the following (making sure to replace
  `BUCKET NAME` with your actual bucket name): `<BUCKET NAME>.s3-website-us-east-1.amazonaws.com`

- Select `HTTP only` for the `Protocol` field. This is the protocol that
  Cloudfront will use to request files from S3. Users can still view the
  public site via HTTPS.

- Scroll down to the `Web Application Firewall` section. Select the
  `Enable security protections` option.

- Leave all other settings the same for now (we'll probably need to come back
  into these settings to update things like the domain name and certificate)

- Create the distribution. Open the new distribution and you should see a
  `Distribution domain name` field. If everything was configured correctly,
  you should be able to copy + paste this into a new tab in your browser
  and see the static site (for now it will only show the `index.html` test
  file that you manually uploaded to the bucket)

- Make note of the Distribution ID (you'll need this later).

- The last thing we need to do in Cloudfront is configure the rewrite rule
  for AB testing as a Cloudfront function. Click the little hamburger menu
  on the top left side of the Cloudfront console to open the side menu.
  Click on `Functions`. Within this page, click the `Create function` button.

- Use a meaningful name and description (make sure they indicate this is for
  Firefly -- Cloudfront functions are globally visible so we want to avoid
  confusion if we add other functions, for other sites, at a later date).

- Make sure `cloudfront-js-2.0` is selected as the runtime.

- Once the function is created, open it to edit its settings.

- Under the `Build` section below, enter the following function code - you can find code here: `docs/cloudfrontABTestingFunction.js`
  [link to the code](https://github.com/sanctuarycomputer/firefly-health-website/blob/main/docs/cloudfrontABTestingFunction.js)

- Save your changes.

- You can test this function if you'd like via the `Test` menu header.
  This is a good way to check how the function will behave in various
  scenarios (but ultimately we should have unit tests in our repo for this).

- Click `Publish` to make the function available to Cloudfront distributions.

- In the `Associated distributions` section below, click `Add association`.
  search for your distribution ID (from the earlier step) and leave the other
  settings the same. Submit this form.

- If everything worked correctly, you should be able to run the following
  and see the cookie header being assigned to a new incoming request:

```bash
curl <distribution domain> -V
```

## Circle Ci

To connect your CircleCI to the Firefly Health website repo and configure it to work with AWS S3, follow these steps:

- Connect CircleCI to the Repo:

  - Go to the CircleCI dashboard.
  - Find and select the option to add a new project.
  - Choose your Firefly Health website repository from the list of available repositories and follow the prompts to connect it to CircleCI.

- Add Environment Variables:

  - In your CircleCI project settings, navigate to the "Environment Variables" section.
  - Add the following environment variables:
    - AWS_DEFAULT_REGION: Set this variable to the region where your S3 bucket is located. You can find this information in your S3 bucket under "Properties" > "Bucket overview".
    - BUCKET_NAME: Set this variable to the name of your S3 bucket (e.g., s3://some-bucket-name).

- Configure OIDC and Role ARN:
  - Follow the documentation provided in the [CircleCI blog post](https://circleci.com/blog/openid-connect-identity-tokens/) to create an OIDC (OpenID Connect) and connect it to your S3 bucket.
  - Once you have created the OIDC, obtain the Role ARN associated with it.
  - ROLE_ARN: Add Role ARN to CircleCI "Environment Variables".

# Trouble shooting

- [The bucket does not allow ACLs](https://stackoverflow.com/questions/71080354/getting-the-bucket-does-not-allow-acls-error)

- [Circle Ci example](https://circleci.com/developer/orbs/orb/circleci/aws-s3#usage-sync_and_copy_with_oidc)
