package com.taskflow.service;

import com.taskflow.dto.request.TaskRequest;
import com.taskflow.dto.response.TaskResponse;
import com.taskflow.entity.Task;
import com.taskflow.entity.TaskStatus;
import com.taskflow.entity.User;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.mapper.TaskMapper;
import com.taskflow.repository.TaskRepository;
import com.taskflow.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final SecurityUtils securityUtils;

    @Transactional(readOnly = true)
    public List<TaskResponse> getAllTasks(TaskStatus status) {
        User user = securityUtils.getCurrentUser();
        List<Task> tasks = status == null
                ? taskRepository.findByOwnerIdOrderByUpdatedAtDesc(user.getId())
                : taskRepository.findByOwnerIdAndStatusOrderByUpdatedAtDesc(user.getId(), status);
        return tasks.stream().map(taskMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id) {
        User user = securityUtils.getCurrentUser();
        Task task = taskRepository.findByIdAndOwnerId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return taskMapper.toResponse(task);
    }

    @Transactional
    public TaskResponse createTask(TaskRequest request) {
        User user = securityUtils.getCurrentUser();
        Task task = taskMapper.toEntity(request);
        task.setOwner(user);
        return taskMapper.toResponse(taskRepository.save(task));
    }

    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest request) {
        User user = securityUtils.getCurrentUser();
        Task task = taskRepository.findByIdAndOwnerId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskMapper.updateEntity(task, request);
        return taskMapper.toResponse(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        User user = securityUtils.getCurrentUser();
        Task task = taskRepository.findByIdAndOwnerId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskRepository.delete(task);
    }
}
