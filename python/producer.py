
from litequeue import LiteQueue

q = LiteQueue("./data.sqlite3")

if __name__ == "__main__":
    while True:
        value = input("value = ")
        if value == "":
            break

        q.put(value)

