package com.project.TaskManager.dto;

import com.project.TaskManager.entity.Task;

import lombok.Data;

@Data 
public class TaskRespond {

    private Long id;
    private String title;
    private String description;
    private String status;

    public static TaskRespond from(Task task) {
        TaskRespond respond = new TaskRespond();
        respond.setId(task.getId());
        respond.setTitle(task.getTitle());
        respond.setDescription(task.getDescription());
        respond.setStatus(task.getStatus());
        return respond;
    }


}
