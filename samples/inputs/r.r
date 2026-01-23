# R Comprehensive Sample - Statistical Computing and Data Science
# Demonstrating R 3.x and R 4.x features

# =============================================================================
# 1. Basic Syntax and Assignment Operators
# =============================================================================

# Various assignment operators
x <- 5                    # Left assignment (standard)
10 -> y                   # Right assignment
z <<- 15                  # Super assignment (global)
20 ->> w                  # Right super assignment
a = 25                    # Equal assignment (also valid)
b := 30                   # Walrus operator (R 4.1+)

# =============================================================================
# 2. Data Types and Structures
# =============================================================================

# Vectors
numeric_vec <- c(1, 2, 3, 4, 5)
char_vec <- c("apple", "banana", "cherry")
logical_vec <- c(TRUE, FALSE, T, F)
integer_vec <- c(1L, 2L, 3L, 4L, 5L)

# Special values
special <- c(NA, NULL, NaN, Inf, -Inf)
na_types <- c(NA_integer_, NA_real_, NA_complex_, NA_character_)

# Sequences
seq1 <- 1:10                    # Sequence using colon
seq2 <- seq(1, 100, by = 5)     # Sequence function
seq3 <- seq(0, 1, length.out = 11)

# Lists
my_list <- list(
  numbers = c(1, 2, 3),
  names = c("Alice", "Bob"),
  nested = list(a = 1, b = 2)
)

# Data frames
df <- data.frame(
  id = 1:5,
  name = c("Alice", "Bob", "Charlie", "David", "Eve"),
  age = c(25, 30, 35, 28, 32),
  salary = c(50000, 60000, 75000, 55000, 65000),
  stringsAsFactors = FALSE
)

# Matrices
mat <- matrix(1:12, nrow = 3, ncol = 4)
mat2 <- matrix(rnorm(20), nrow = 5)

# Arrays
arr <- array(1:24, dim = c(3, 4, 2))

# Factors
gender <- factor(c("Male", "Female", "Female", "Male", "Other"))
ordered_factor <- ordered(c("Low", "Medium", "High", "Low"), 
                          levels = c("Low", "Medium", "High"))

# =============================================================================
# 3. Operators
# =============================================================================

# Arithmetic operators
add <- 10 + 5
subtract <- 10 - 5
multiply <- 10 * 5
divide <- 10 / 5
power1 <- 2 ^ 8
power2 <- 2 ** 8
modulo <- 10 %% 3
int_div <- 10 %/% 3

# Matrix operators
A <- matrix(1:4, 2, 2)
B <- matrix(5:8, 2, 2)
mat_mult <- A %*% B           # Matrix multiplication
outer <- A %o% B              # Outer product
kronecker <- A %x% B          # Kronecker product

# Comparison operators
eq <- 5 == 5
ne1 <- 5 != 6
ne2 <- 5 <> 6
lt <- 3 < 5
gt <- 7 > 3
le <- 5 <= 5
ge <- 10 >= 8

# Logical operators
and1 <- TRUE & FALSE          # Element-wise AND
and2 <- TRUE && FALSE         # Short-circuit AND
or1 <- TRUE | FALSE           # Element-wise OR
or2 <- TRUE || FALSE          # Short-circuit OR
not <- !TRUE

# Special operators
formula <- y ~ x1 + x2        # Formula notation
pipe_result <- mtcars |> head(3)                    # Base R pipe (R 4.1+)
# magrittr_result <- mtcars %>% filter(mpg > 20)   # magrittr pipe

# =============================================================================
# 4. Indexing and Subsetting
# =============================================================================

# Vector indexing
vec <- c(10, 20, 30, 40, 50)
first <- vec[1]                # Single element
slice <- vec[2:4]              # Range
selected <- vec[c(1, 3, 5)]    # Specific elements
logical <- vec[vec > 25]       # Logical indexing
negative <- vec[-2]            # Exclude element

# List indexing
list_data <- list(a = 1:3, b = "text", c = TRUE)
elem1 <- list_data[[1]]        # Extract element
elem2 <- list_data[["a"]]      # Extract by name
elem3 <- list_data$a           # Dollar sign notation
sublist <- list_data[1:2]      # Subset as list

# Data frame indexing
df_subset <- df[1:3, ]         # First 3 rows
col_subset <- df[, c("name", "age")]   # Select columns
element <- df[2, "name"]       # Specific element
dollar_col <- df$age           # Column by name
condition <- df[df$age > 30, ] # Conditional

# Matrix indexing
mat_elem <- mat[2, 3]          # Element at row 2, col 3
mat_row <- mat[1, ]            # Entire row
mat_col <- mat[, 2]            # Entire column
mat_sub <- mat[1:2, 2:4]       # Submatrix

# =============================================================================
# 5. Control Structures
# =============================================================================

# If-else statements
score <- 85
if (score >= 90) {
  grade <- "A"
} else if (score >= 80) {
  grade <- "B"
} else if (score >= 70) {
  grade <- "C"
} else {
  grade <- "F"
}

# Inline if-else
result <- if (x > 10) "large" else "small"
ifelse_result <- ifelse(vec > 25, "high", "low")

# For loops
for (i in 1:5) {
  print(i * 2)
}

for (item in c("apple", "banana", "cherry")) {
  print(paste("Fruit:", item))
}

# While loops
counter <- 1
while (counter <= 5) {
  print(counter)
  counter <- counter + 1
}

# Repeat loops with break
counter <- 1
repeat {
  print(counter)
  counter <- counter + 1
  if (counter > 5) break
}

# Next (continue) statement
for (i in 1:10) {
  if (i %% 2 == 0) next
  print(i)  # Only odd numbers
}

# =============================================================================
# 6. Functions
# =============================================================================

# Basic function
add_numbers <- function(a, b) {
  result <- a + b
  return(result)
}

# Function with default arguments
greet <- function(name = "World", greeting = "Hello") {
  message <- paste(greeting, name, "!")
  return(message)
}

# Function with variable arguments
sum_all <- function(...) {
  args <- list(...)
  total <- 0
  for (arg in args) {
    total <- total + arg
  }
  return(total)
}

# Anonymous functions (lambda)
square <- function(x) x^2
apply_func <- sapply(1:5, function(x) x * 2)

# Closures
make_multiplier <- function(n) {
  multiplier <- function(x) {
    return(x * n)
  }
  return(multiplier)
}
times_three <- make_multiplier(3)
result <- times_three(10)  # 30

# =============================================================================
# 7. Apply Family Functions
# =============================================================================

# lapply - returns list
list_result <- lapply(1:5, function(x) x^2)

# sapply - simplifies to vector/matrix
vec_result <- sapply(1:5, function(x) x^2)

# vapply - specify return type
typed_result <- vapply(1:5, function(x) x^2, numeric(1))

# mapply - multivariate
mapply_result <- mapply(function(x, y) x + y, 1:5, 6:10)

# apply - for matrices/arrays
matrix_sums <- apply(mat, 1, sum)     # Row sums
matrix_means <- apply(mat, 2, mean)   # Column means

# tapply - grouped apply
tapply_result <- tapply(df$salary, df$age, mean)

# =============================================================================
# 8. Statistical Functions
# =============================================================================

# Descriptive statistics
data <- rnorm(100, mean = 50, sd = 10)
mean_val <- mean(data)
median_val <- median(data)
sd_val <- sd(data)
var_val <- var(data)
quantiles <- quantile(data, probs = c(0.25, 0.5, 0.75))
summary_stats <- summary(data)

# Distributions
normal <- rnorm(100, mean = 0, sd = 1)
uniform <- runif(100, min = 0, max = 1)
binomial <- rbinom(100, size = 10, prob = 0.5)
poisson <- rpois(100, lambda = 5)
exponential <- rexp(100, rate = 1)

# Probability functions
p_norm <- pnorm(1.96)              # CDF
d_norm <- dnorm(0, mean = 0, sd = 1)  # PDF
q_norm <- qnorm(0.975)             # Quantile

# Hypothesis testing
t_test <- t.test(data, mu = 50)
cor_test <- cor.test(df$age, df$salary)

# Linear regression
model <- lm(salary ~ age, data = df)
summary_model <- summary(model)
predictions <- predict(model, newdata = data.frame(age = c(25, 30, 35)))

# =============================================================================
# 9. Data Manipulation
# =============================================================================

# Sorting
sorted_vec <- sort(vec, decreasing = TRUE)
ordered_df <- df[order(df$salary, decreasing = TRUE), ]

# Aggregation
aggregate_result <- aggregate(salary ~ age, data = df, FUN = mean)

# Merging
df1 <- data.frame(id = 1:3, value1 = c(10, 20, 30))
df2 <- data.frame(id = 2:4, value2 = c(40, 50, 60))
merged <- merge(df1, df2, by = "id", all = TRUE)

# Reshaping
wide_data <- data.frame(
  id = 1:3,
  time1 = c(10, 20, 30),
  time2 = c(15, 25, 35)
)
long_data <- reshape(wide_data, 
                     varying = c("time1", "time2"),
                     v.names = "value",
                     timevar = "time",
                     times = c(1, 2),
                     direction = "long")

# =============================================================================
# 10. String Operations
# =============================================================================

# String functions
text <- "Hello World"
upper <- toupper(text)
lower <- tolower(text)
length <- nchar(text)
substring <- substr(text, 1, 5)
replaced <- gsub("World", "R", text)
split <- strsplit(text, " ")
paste_result <- paste("Hello", "World", sep = " ")
paste0_result <- paste0("Hello", "World")

# Pattern matching
grepl_result <- grepl("^Hello", text)
grep_result <- grep("World", c("Hello", "World", "R"))

# =============================================================================
# 11. Working with Packages and Namespaces
# =============================================================================

# Load packages
library(stats)
require(graphics)

# Namespace operators
base_mean <- base::mean(data)
stats_sd <- stats::sd(data)
internal_func <- stats:::someInternalFunction  # Internal function

# Install packages (commented to prevent execution)
# install.packages("ggplot2")
# install.packages(c("dplyr", "tidyr", "readr"))

# =============================================================================
# 12. File I/O
# =============================================================================

# Reading data (commented to prevent file operations)
# csv_data <- read.csv("data.csv", header = TRUE)
# table_data <- read.table("data.txt", sep = "\t")
# rds_data <- readRDS("data.rds")

# Writing data
# write.csv(df, "output.csv", row.names = FALSE)
# write.table(df, "output.txt", sep = "\t")
# saveRDS(df, "output.rds")

# =============================================================================
# 13. Advanced Features
# =============================================================================

# Environments
new_env <- new.env()
assign("x", 10, envir = new_env)
value <- get("x", envir = new_env)

# Object-oriented programming (S3)
person <- list(name = "Alice", age = 30)
class(person) <- "Person"

print.Person <- function(obj) {
  cat("Person:", obj$name, ", Age:", obj$age, "\n")
}

# Error handling
result <- tryCatch({
  risky_operation <- log(-1)
}, warning = function(w) {
  print("Warning occurred")
}, error = function(e) {
  print("Error occurred")
  return(NA)
}, finally = {
  print("Cleanup code")
})

# =============================================================================
# 14. Vectorization and Performance
# =============================================================================

# Vectorized operations (efficient)
vec1 <- 1:1000000
vec2 <- 1:1000000
vectorized_sum <- vec1 + vec2

# Avoid loops when possible
squares_bad <- numeric(1000)
for (i in 1:1000) {
  squares_bad[i] <- i^2
}

squares_good <- (1:1000)^2  # Vectorized, much faster

# =============================================================================
# 15. Plotting (Base R)
# =============================================================================

# Basic plots (commented to prevent graphics window)
# plot(df$age, df$salary, main = "Age vs Salary", xlab = "Age", ylab = "Salary")
# hist(data, main = "Histogram", xlab = "Value", breaks = 20)
# boxplot(salary ~ age, data = df, main = "Salary by Age")
# barplot(table(gender), main = "Gender Distribution")

# =============================================================================
# 16. Date and Time
# =============================================================================

# Date operations
today <- Sys.Date()
now <- Sys.time()
date_obj <- as.Date("2024-01-15")
formatted <- format(today, "%Y-%m-%d")
diff_days <- difftime(today, date_obj, units = "days")

# POSIXct and POSIXlt
datetime <- as.POSIXct("2024-01-15 14:30:00")
datetime_lt <- as.POSIXlt("2024-01-15 14:30:00")

# =============================================================================
# 17. Regular Expressions
# =============================================================================

text_vec <- c("apple", "banana", "cherry", "apricot")
matches <- grep("^a", text_vec, value = TRUE)
replaced_all <- gsub("[aeiou]", "*", text_vec)
extracted <- regmatches(text_vec, regexpr("an", text_vec))

# =============================================================================
# 18. Functional Programming
# =============================================================================

# Map-reduce pattern
numbers <- 1:10
doubled <- Map(function(x) x * 2, numbers)
sum_result <- Reduce(`+`, numbers)
filtered <- Filter(function(x) x > 5, numbers)

# Composition
add_one <- function(x) x + 1
multiply_two <- function(x) x * 2
composed <- function(x) multiply_two(add_one(x))
result <- composed(5)  # (5 + 1) * 2 = 12

# =============================================================================
# 19. Working with Missing Data
# =============================================================================

data_with_na <- c(1, 2, NA, 4, 5, NA)
has_na <- is.na(data_with_na)
complete <- complete.cases(data_with_na)
omitted <- na.omit(data_with_na)
mean_no_na <- mean(data_with_na, na.rm = TRUE)

# =============================================================================
# 20. Formula Interface
# =============================================================================

# Statistical formulas
formula1 <- y ~ x                           # Simple linear
formula2 <- y ~ x1 + x2                     # Multiple predictors
formula3 <- y ~ x1 * x2                     # Interaction
formula4 <- y ~ x1 + x2 + x1:x2            # Explicit interaction
formula5 <- y ~ poly(x, 2)                  # Polynomial
formula6 <- y ~ .                           # All predictors
formula7 <- log(y) ~ log(x)                 # Transformations

# Using formulas
model1 <- lm(salary ~ age, data = df)
model2 <- lm(salary ~ age + I(age^2), data = df)  # Quadratic

# =============================================================================
# 21. Random Number Generation
# =============================================================================

# Set seed for reproducibility
set.seed(42)

# Various random distributions
rnorm_vals <- rnorm(100, mean = 0, sd = 1)
runif_vals <- runif(100, min = 0, max = 10)
sample_vals <- sample(1:100, size = 20, replace = FALSE)
sample_prob <- sample(c("A", "B", "C"), size = 100, replace = TRUE, 
                      prob = c(0.5, 0.3, 0.2))

# =============================================================================
# 22. Custom Infix Operators
# =============================================================================

# Define custom infix operator
`%+%` <- function(a, b) {
  paste(a, b, sep = "")
}

result <- "Hello" %+% "World"  # "HelloWorld"

`%notin%` <- function(x, y) {
  !(x %in% y)
}

check <- 5 %notin% c(1, 2, 3, 4)  # TRUE

# =============================================================================
# 23. Special Constructs
# =============================================================================

# Question mark for help (commented)
# ?mean
# help(lm)
# ??regression

# Backtick identifiers for non-standard names
`my variable` <- 42
`function name with spaces` <- function(x) x + 1
result <- `my variable` + `function name with spaces`(5)

# Ellipsis in functions
my_print <- function(x, ...) {
  print(x)
  print(list(...))
}

my_print("Hello", a = 1, b = 2, c = 3)

# =============================================================================
# 24. Matrix and Array Operations
# =============================================================================

# Matrix operations
mat_transpose <- t(mat)
mat_inverse <- solve(diag(3))
mat_determinant <- det(diag(3))
mat_eigen <- eigen(diag(3))
mat_diag <- diag(c(1, 2, 3))

# Cross product and outer product
vec_a <- c(1, 2, 3)
vec_b <- c(4, 5, 6)
cross <- crossprod(vec_a, vec_b)     # t(a) %*% b
outer_prod <- outer(vec_a, vec_b)    # Same as vec_a %o% vec_b

# =============================================================================
# 25. Performance Profiling
# =============================================================================

# Timing code
system.time({
  result <- sum(1:1000000)
})

# Benchmarking (base R)
start_time <- Sys.time()
for (i in 1:1000) {
  x <- rnorm(100)
}
end_time <- Sys.time()
elapsed <- end_time - start_time

# =============================================================================
# End of R Comprehensive Sample
# =============================================================================

print("R sample completed successfully!")
