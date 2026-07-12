"""
Live Crowd Status (Demo Data)
Can later be connected to IoT sensors, CCTV analytics, or Firebase.
"""

CROWD_DATA = {

    "Gate A": {
        "crowd_level": "Low",
        "wait_time": "2 min",
        "status": "🟢",
        "occupancy": "25%",
        "recommendation": "Fastest entry gate"
    },

    "Gate B": {
        "crowd_level": "Medium",
        "wait_time": "5 min",
        "status": "🟡",
        "occupancy": "58%",
        "recommendation": "Normal waiting time"
    },

    "Gate C": {
        "crowd_level": "High",
        "wait_time": "12 min",
        "status": "🔴",
        "occupancy": "94%",
        "recommendation": "Use Gate A if possible"
    },

    "Gate D": {
        "crowd_level": "Low",
        "wait_time": "1 min",
        "status": "🟢",
        "occupancy": "18%",
        "recommendation": "Best alternate entry"
    },

    "Food Court": {
        "crowd_level": "Medium",
        "wait_time": "8 min",
        "status": "🟡",
        "occupancy": "71%",
        "recommendation": "East Food Court has shorter queues"
    },

    "Restroom North": {
        "crowd_level": "Low",
        "wait_time": "No Queue",
        "status": "🟢",
        "occupancy": "22%",
        "recommendation": "Recommended"
    },

    "Restroom South": {
        "crowd_level": "High",
        "wait_time": "6 min",
        "status": "🔴",
        "occupancy": "83%",
        "recommendation": "Use Restroom North"
    }

}