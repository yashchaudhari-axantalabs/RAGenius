import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables from specific files
load_dotenv(os.path.join(os.path.dirname(__file__), "../../user.env"))
load_dotenv(os.path.join(os.path.dirname(__file__), "../../developer.env"))

class MailService:
    def __init__(self):
        self.username = os.getenv("MAIL_USERNAME")
        self.password = os.getenv("MAIL_PASSWORD")
        self.server = os.getenv("MAIL_SERVER", "smtp.gmail.com")
        self.port = int(os.getenv("MAIL_PORT", 587))
        self.mail_from = os.getenv("MAIL_FROM", "axantalabs@gmail.com")

    def send_email(self, subject: str, body: str, to_email: str = "axantalabs@gmail.com"):
        """
        Sends an email using the configured SMTP settings.
        """
        if not self.username or not self.password:
            print("WARNING: Email credentials not configured. Skipping email sending.")
            print(f"DEBUG: Email would have been sent to {to_email} with subject '{subject}'")
            return False

        try:
            msg = MIMEMultipart()
            msg['From'] = self.mail_from
            msg['To'] = to_email
            msg['Subject'] = subject

            msg.attach(MIMEText(body, 'plain'))

            # Set up the SMTP server
            with smtplib.SMTP(self.server, self.port) as server:
                server.starttls()  # Secure the connection
                server.login(self.username, self.password)
                server.send_message(msg)
            
            print(f"Successfully sent email to {to_email}")
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

# Initialize a global service instance
mail_service = MailService()
