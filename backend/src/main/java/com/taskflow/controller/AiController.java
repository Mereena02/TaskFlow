package com.taskflow.controller;

import com.taskflow.dto.request.AiDescriptionRequest;
import com.taskflow.dto.response.AiDescriptionResponse;
import com.taskflow.service.GeminiAiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final GeminiAiService geminiAiService;

    @PostMapping("/generate-description")
    public AiDescriptionResponse generateDescription(@Valid @RequestBody AiDescriptionRequest request) {
        return geminiAiService.generateTaskDescription(request);
    }
}
