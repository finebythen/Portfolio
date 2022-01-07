def get_user_name(req) -> str:
    try:
        u = req.user
        return f"{u.first_name} {u.last_name}"
    except ConnectionError:
        return ""
