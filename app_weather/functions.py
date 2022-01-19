import datetime as dt
from typing import List

def get_list_hours() -> List[str]:
    l, l_skip, l_choice = [], [], [0, 5, 11, 17, 23, 29, 35, 41, 47]
    now = dt.datetime.now()
    for i in range((now.hour + 1), (now.hour + 49)):
        if i == 24 or i == 48:
            l.append("00:00")
        elif i > 24 and i < 48:
            l.append(f"{i-24}:00")
        elif i > 48:
            l.append(f"{i-48}:00")
        elif i >= 10 and i < 24:
            l.append(f"{i}:00")
        else:
            l.append(f"0{i}:00")

    for counter, value in enumerate(l):
        if counter in l_choice:
            l_skip.append(value)
        else:
            l_skip.append("")

    return l_skip