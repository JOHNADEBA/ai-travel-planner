from datetime import datetime, timedelta
from typing import List

def calculate_days(start: str, end: str) -> int:
    """Calculate number of days between dates"""
    try:
        start_date = datetime.fromisoformat(start)
        end_date = datetime.fromisoformat(end)
        return (end_date - start_date).days + 1
    except:
        return 5


def generate_dates(start_date: str, end_date: str) -> List[str]:
    """Generate list of dates between start and end"""
    try:
        first_date = datetime.fromisoformat(start_date)
        return [(first_date + timedelta(days=i)).isoformat()[:10] 
                for i in range(calculate_days(start_date, end_date))]
    except:
        return [start_date]