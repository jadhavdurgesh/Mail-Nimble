
# MailNimble - AI-Powered Email Assistant
<!-- Replace with your logo URL if you have one -->
![MailNimble](https://github.com/user-attachments/assets/479188b0-27ab-4ac8-95c4-ca0125e785c4)

**MailNimble** is an intelligent email assistant designed to enhance your Gmail experience. Built with a Flutter frontend, Spring Boot backend, and a Chrome extension, it integrates seamlessly with Gmail via the Chrome API. Powered by the Gemini API, MailNimble lets users compose emails with customizable tones (e.g., formal, casual, persuasive) and provides live UI updates for a smooth, cross-platform workflow. This project showcases full-stack development, OAuth authentication, and AI automation, completed between June 2024 and September 2024.

Watch the demo video: [MailNimble Demo]


https://github.com/user-attachments/assets/8a4ee6bc-6c0c-46ef-965e-16727f131be8



## Features

- **AI Email Composition**: Generate emails with tone selection (e.g., professional, friendly) using the Gemini API.
- **Chrome Extension**: Integrates directly with Gmail for real-time email drafting and management.
- **Live UI Updates**: Backend syncs with the Flutter frontend for a responsive user experience.
- **Cross-Platform**: Works on web, mobile (via Flutter), and as a browser extension.
- **OAuth Authentication**: Securely connects to Gmail using Chrome extension OAuth flows.
- **Seamless Workflow**: Enhances productivity with AI-driven automation and intuitive design.

## Tech Stack

- **Frontend**: Flutter (cross-platform UI)
- **Backend**: Spring Boot (Java)
- **AI Integration**: Gemini API (for tone-based email generation)
- **Browser Extension**: Chrome API (Gmail integration)
- **Authentication**: OAuth 2.0
- **Automation**: AI-driven email drafting and suggestions


## Installation

### Prerequisites
- **Flutter**: v3.x.x (install from [flutter.dev](https://flutter.dev))
- **Java**: JDK 17+ (for Spring Boot)
- **Node.js**: For Chrome extension development (optional)
- **Gemini API Key**: Obtain from [Gemini API provider](#) <!-- Replace with actual link -->
- **Chrome Browser**: For extension testing

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/MailNimble.git
   cd MailNimble
   ```

2. **Backend (Spring Boot)**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Update `application.properties` with your Gemini API key and OAuth credentials:
     ```properties
     gemini.api.key=your-api-key
     spring.security.oauth2.client.registration.google.client-id=your-client-id
     spring.security.oauth2.client.registration.google.client-secret=your-client-secret
     ```
   - Build and run:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Frontend (Flutter)**:
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     flutter pub get
     ```
   - Run the app:
     ```bash
     flutter run
     ```

4. **Chrome Extension**:
   - Navigate to the extension folder:
     ```bash
     cd chrome-extension
     ```
   - Load in Chrome:
     - Open Chrome → `chrome://extensions/` → Enable "Developer mode" → Click "Load unpacked" → Select the `chrome-extension` folder.
   - Configure OAuth in `manifest.json` if needed.

5. **Run Together**:
   - Ensure the backend is running (port 8080 by default).
   - Launch the Flutter app and load the Chrome extension.
   - Test with Gmail.

## How It Works

1. **AI Tone Selection**: Open the Chrome extension in Gmail, select a tone (e.g., "Formal"), and let the Gemini API draft your email.
2. **Live Sync**: The Spring Boot backend processes the request and updates the Flutter UI in real-time.
3. **Gmail Integration**: The Chrome extension injects the drafted email into your Gmail compose window.
4. **OAuth Flow**: Securely authenticate with Gmail using Google’s OAuth 2.0.

## Demo Video
Check out how MailNimble works: [Watch Here](https://your-video-link-here.com) <!-- Replace with your video link -->

## Challenges & Learnings
- Mastered full-stack integration between Flutter, Spring Boot, and Chrome APIs.
- Implemented OAuth flows for secure Gmail access.
- Optimized AI responses for tone accuracy and speed.

## Future Enhancements
- Add support for more email providers (e.g., Outlook).
- Enhance AI with custom user-trained models.
- Improve Flutter UI with more customization options.

## Contributing
Feel free to fork this repo and submit pull requests! For issues, open a ticket in the [Issues](https://github.com/your-username/MailNimble/issues) section.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- **Author**: Durgesh Jadhav
- **Email**: jadhavdurgesh007@gmail.com
- **GitHub**: [jadhavdurgesh](https://github.com/jadhavdurgesh)
