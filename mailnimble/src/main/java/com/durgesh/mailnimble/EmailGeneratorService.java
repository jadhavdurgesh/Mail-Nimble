package com.durgesh.mailnimble;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    public EmailGeneratorService(WebClient webClient) {
        this.webClient = webClient;
    }

    @Value("${gemini.api.url}")
    private String gemeniApiUrl;
    @Value("${gemini.api.key}")
    private String gemeniApiKey;

    public String generateEmailReply(EmailRequest emailRequest) {

        // build the prompt first
        String prompt = buildPrompt(emailRequest);
        // craft a request
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                });
        // make request and get response
        String response = webClient.post().uri(gemeniApiUrl + gemeniApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        // extract reponse and return reponse

        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error in generating email reply" + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append(
                "Generate a well-structured and natural email reply. Ensure the response is professional, concise, and engaging. ")
                .append("The reply should directly address the original email's content and intent without including a subject line. ")
                .append("Maintain a writing style that aligns with the given tone while keeping the language clear and polite.");

        // if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
        //     prompt.append("Respond appropriately while maintaining politeness and conciseness and with a :")
        //             .append(emailRequest.getTone()).append("tone.");
        // }
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append(" Adjust the writing style to reflect a ").append(emailRequest.getTone())
                    .append(" approach.");
        }

        prompt.append("\n Here is the original email:").append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}
