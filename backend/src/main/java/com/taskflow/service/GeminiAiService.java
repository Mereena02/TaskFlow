package com.taskflow.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.taskflow.config.GeminiProperties;
import com.taskflow.dto.request.AiDescriptionRequest;
import com.taskflow.dto.response.AiDescriptionResponse;
import com.taskflow.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiAiService {

    private final GeminiProperties geminiProperties;
    private final RestClient restClient;

    public AiDescriptionResponse generateTaskDescription(AiDescriptionRequest request) {
        if (geminiProperties.getApiKey() == null || geminiProperties.getApiKey().isBlank()) {
            throw new BadRequestException("Gemini API key is not configured. Set GEMINI_API_KEY.");
        }

        String prompt = buildPrompt(request);
        String url = String.format(
                "%s/models/%s:generateContent?key=%s",
                geminiProperties.getBaseUrl(),
                geminiProperties.getModel(),
                geminiProperties.getApiKey()
        );

        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
        );

        try {
            JsonNode response = restClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);
            return AiDescriptionResponse.builder().description(extractText(response)).build();
        } catch (RestClientResponseException ex) {
            throw new BadRequestException("Gemini API error: " + ex.getResponseBodyAsString());
        }
    }

    private String buildPrompt(AiDescriptionRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Write a clear, actionable task description for a task management app. ");
        prompt.append("Use 2-4 sentences. Be specific and professional.\n\n");
        prompt.append("Task title: ").append(request.getTitle()).append("\n");
        if (request.getContext() != null && !request.getContext().isBlank()) {
            prompt.append("Context: ").append(request.getContext()).append("\n");
        }
        prompt.append("\nReturn only the description text.");
        return prompt.toString();
    }

    private String extractText(JsonNode response) {
        JsonNode textNode = response.path("candidates").path(0).path("content").path("parts").path(0).path("text");
        if (textNode.isMissingNode() || textNode.asText().isBlank()) {
            throw new BadRequestException("Gemini returned an empty description");
        }
        return textNode.asText().trim();
    }
}
