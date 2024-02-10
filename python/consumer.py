from time import sleep
from litequeue import LiteQueue

from terminate import TerminateProtected

q = LiteQueue("./data.sqlite3")

if __name__ == "__main__":
    while True:
        with TerminateProtected():
            task = q.pop()
            print(task)
            sleep(1)

