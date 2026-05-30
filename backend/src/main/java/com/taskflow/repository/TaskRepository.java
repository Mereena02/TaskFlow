package com.taskflow.repository;

import com.taskflow.entity.Task;
import com.taskflow.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByOwnerIdOrderByUpdatedAtDesc(Long ownerId);

    List<Task> findByOwnerIdAndStatusOrderByUpdatedAtDesc(Long ownerId, TaskStatus status);

    Optional<Task> findByIdAndOwnerId(Long id, Long ownerId);
}
