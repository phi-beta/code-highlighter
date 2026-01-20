// Java sample code for syntax highlighting testing
package com.example.demo;

import java.util.*;
import java.io.IOException;

/**
 * Sample Java class demonstrating various language features
 */
@Entity
@Table(name = "users")
public class User {
    // Instance variables
    private static final String DEFAULT_NAME = "Unknown";
    private int id;
    private String name;
    private boolean active = true;
    private List<String> roles;
    
    // Constructor
    public User(int id, String name) {
        this.id = id;
        this.name = name != null ? name : DEFAULT_NAME;
        this.roles = new ArrayList<>();
    }
    
    // Getters and setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // Method with annotations
    @Override
    public String toString() {
        return String.format("User{id=%d, name='%s', active=%b}", 
                           id, name, active);
    }
    
    // Generic method
    public <T> List<T> convertList(List<? extends T> source) {
        return new ArrayList<>(source);
    }
    
    // Static method
    public static User createDefaultUser() {
        return new User(0, DEFAULT_NAME);
    }
    
    // Exception handling
    public void processData() throws IOException {
        try {
            // Some processing logic
            if (name == null) {
                throw new IllegalArgumentException("Name cannot be null");
            }
            // Lambda expression
            roles.forEach(role -> System.out.println("Role: " + role));
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            // Cleanup code
            System.out.println("Processing completed");
        }
    }
    
    // Numbers and literals
    private void demonstrateNumbers() {
        int decimal = 42;
        long longValue = 123456789L;
        float floatValue = 3.14f;
        double doubleValue = 2.718281828;
        
        // Hex, binary, octal
        int hex = 0xFF;
        int binary = 0b1010;
        int octal = 077;
        
        // Character literals
        char letter = 'A';
        char unicode = '\u0041';
        char escape = '\'';
    }
}
