package com.project.TaskManager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity 
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title không được để trống")
    @Size (max = 100, message = "Title không được vượt quá 100 ký tự")
    private String title;

    private String description;

    @NotBlank (message = "Status không được để trống")
    private String status; // e.g., "Pending", "In Progress", "Completed"
}
