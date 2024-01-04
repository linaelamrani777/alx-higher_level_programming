#!/usr/bin/python3

if __name__ == "__main__":
    import sys

    count = len(sys.argv) - 1

    # Print the number of arguments
    if count == 0:
        print("Number of arguments: 0.")
    elif count == 1:
        print("Number of argument: 1.")
    else:
        print("Number of arguments: {}.".format(count))

    # Print the list of arguments
    if count > 0:
        print("Arguments:")
        for i in range(count):
            print("{}: {}".format(i + 1, sys.argv[i + 1]))
    else:
        print(".")
