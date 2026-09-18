package com.project.TaskManager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class TaskRequest {

    @NotBlank (message = "Title không được để trống")
    @Size (max = 100, message = "Title không được vượt quá 100 ký tự")
    private String title;

    private String description;

    @NotBlank 
    private String status; // e.g., "Pending", "In Progress", "Completed"
}
