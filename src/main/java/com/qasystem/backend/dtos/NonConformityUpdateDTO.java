package com.qasystem.backend.dtos;

import com.qasystem.backend.entities.NonConformitySeverity;
import com.qasystem.backend.entities.NonConformityStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public class NonConformityUpdateDTO {

    @Size(min = 3, max = 200, message = "Título precisa ter de 3 a 200 caracteres")
    @NotBlank(message = "Título é obrigatório")
    private String title;

    @Size(min = 3, message = "Descrição precisa ter no mínimo 3 caracteres")
    private String description;

    private String category;

    @NotNull(message = "Severidade é obrigatória")
    private NonConformitySeverity severity;

    @NotNull(message = "Status é obrigatório")
    private NonConformityStatus status;

    private LocalDate dueDate;

    private UUID assignedToId;

    public NonConformityUpdateDTO() {
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public NonConformitySeverity getSeverity() {
        return severity;
    }

    public NonConformityStatus getStatus() {
        return status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public UUID getAssignedToId() {
        return assignedToId;
    }

}
