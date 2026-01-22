// C sample code demonstrating various language features
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 100
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// Forward declarations
typedef struct Node Node;
typedef enum Status Status;

// Enum definition
enum Status {
    STATUS_OK = 0,
    STATUS_ERROR = -1,
    STATUS_PENDING = 1
};

// Struct definition
struct Node {
    int data;
    char *name;
    struct Node *next;
};

// Union definition
union Data {
    int i;
    float f;
    char str[20];
};

// Global variables
static int global_counter = 0;
const double PI = 3.14159265359;

// Function prototypes
int add(int a, int b);
void print_array(int *arr, size_t len);
Node *create_node(int value);
char *string_duplicate(const char *src);

// Main function
int main(int argc, char *argv[]) {
    printf("C Programming Example\n");
    
    // Variable declarations
    int numbers[5] = {1, 2, 3, 4, 5};
    unsigned long long big_num = 0xFFFFFFFFULL;
    float result = 3.14f;
    char *message = "Hello, World!";
    
    // Pointer operations
    int x = 10;
    int *ptr = &x;
    printf("Value: %d, Address: %p\n", *ptr, (void*)ptr);
    
    // Control structures
    if (argc > 1) {
        printf("Arguments provided: %d\n", argc - 1);
    } else {
        printf("No arguments\n");
    }
    
    // For loop
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
    
    // While loop
    int count = 0;
    while (count < 3) {
        printf("Count: %d\n", count++);
    }
    
    // Do-while loop
    do {
        printf("At least once\n");
    } while (0);
    
    // Switch statement
    Status status = STATUS_OK;
    switch (status) {
        case STATUS_OK:
            printf("Operation successful\n");
            break;
        case STATUS_ERROR:
            printf("Error occurred\n");
            break;
        default:
            printf("Unknown status\n");
    }
    
    // Function calls
    int sum = add(5, 10);
    print_array(numbers, 5);
    
    // Dynamic memory allocation
    Node *node = create_node(42);
    if (node != NULL) {
        printf("Node created with value: %d\n", node->data);
        free(node->name);
        free(node);
    }
    
    // Sizeof operator
    printf("Size of int: %zu bytes\n", sizeof(int));
    printf("Size of struct Node: %zu bytes\n", sizeof(struct Node));
    
    return 0;
}

// Function implementations
int add(int a, int b) {
    return a + b;
}

void print_array(int *arr, size_t len) {
    printf("Array: ");
    for (size_t i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

Node *create_node(int value) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    if (new_node == NULL) {
        return NULL;
    }
    
    new_node->data = value;
    new_node->name = string_duplicate("Node");
    new_node->next = NULL;
    
    return new_node;
}

char *string_duplicate(const char *src) {
    if (src == NULL) {
        return NULL;
    }
    
    size_t len = strlen(src);
    char *dest = (char *)malloc(len + 1);
    
    if (dest != NULL) {
        strcpy(dest, src);
    }
    
    return dest;
}

// Inline function with GCC extension
inline int max(int a, int b) {
    return (a > b) ? a : b;
}

// Static function (file scope)
static void internal_helper(void) {
    global_counter++;
    printf("Helper called: %d times\n", global_counter);
}
