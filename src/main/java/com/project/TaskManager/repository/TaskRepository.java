package com.project.TaskManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.TaskManager.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByTitleContaining(String title);

}
