# Environment Variables

Gan Engine uses environment variables to securely configure sensitive information.

| Variable | Description |
|----------|-------------|
| PORT | Express server port |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret used to sign JWT tokens |
| GOOGLE_CLIENT_ID | Google OAuth Client ID |
| GOOGLE_CLIENT_SECRET | Google OAuth Client Secret |
| GOOGLE_CALLBACK | OAuth callback URL |

Never commit your `.env` file to source control.

Use `.env.example` as a template when setting up a new environment.