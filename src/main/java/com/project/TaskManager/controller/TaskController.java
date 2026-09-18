package com.project.TaskManager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.TaskManager.dto.TaskRequest;
import com.project.TaskManager.dto.TaskRespond;
import com.project.TaskManager.entity.Task;
import com.project.TaskManager.repository.TaskRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor 
public class TaskController {

    private final TaskRepository taskRepository;
    
    @GetMapping
    public List<TaskRespond> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskRespond::from)
                .toList();
    }

    @GetMapping("/search")
    public List<TaskRespond> getTasksByTitle(@RequestParam String title) {
        return taskRepository.findByTitleContaining(title)
                .stream()
                .map(TaskRespond::from)
                .toList();
    }

    @PostMapping
    public TaskRespond createTask(@Valid @RequestBody TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());

        Task savedTask = taskRepository.save(task);
        return TaskRespond.from(savedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
    
}
