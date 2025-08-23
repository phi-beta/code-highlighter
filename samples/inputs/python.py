# Sample Python input for highlighting tests (def, return, f-string, comprehension)
def greet(name: str) -> str:
    message = f"Hello, {name}!"
    numbers = [n * 2 for n in range(3)]
    return message  # return greeting

if __name__ == "__main__":
    print(greet("World"))
