"""Destination-specific content for fallback itineraries"""

def get_destination_content(destination: str) -> dict:
    """Get destination-specific content"""
    dest = destination.lower()
    
    # LONDON
    if any(x in dest for x in ["london", "uk", "england"]):
        return _london_content()
    
    # PARIS
    elif any(x in dest for x in ["paris", "france"]):
        return _paris_content()
    
    # TOKYO
    elif any(x in dest for x in ["tokyo", "japan"]):
        return _tokyo_content()
    
    # ROME
    elif any(x in dest for x in ["rome", "italy"]):
        return _rome_content()
    
    # DEFAULT
    else:
        return _default_content(destination)


def _london_content() -> dict:
    return {
        "day1": {
            "morning": {"activity": "British Museum", "description": "Explore world history from the Rosetta Stone to Egyptian mummies. Free entry!", "cost": 0, "booking": False},
            "afternoon": {"activity": "Covent Garden & West End", "description": "Street performers, boutique shops, and theater district. Catch a matinee show!", "cost": 45, "booking": True},
            "lunch": "Neal's Yard - hidden colorful courtyard with organic cafes",
            "dinner": "Flat Iron - incredible steak at reasonable prices"
        },
        "day2": {
            "morning": {"activity": "Tower of London", "description": "See the Crown Jewels and meet the famous Beefeaters", "cost": 35, "booking": True},
            "afternoon": {"activity": "Tower Bridge & Borough Market", "description": "Walk across the glass floor bridge then explore London's best food market", "cost": 12, "booking": False},
            "lunch": "Borough Market - try the famous raclette or fish & chips",
            "dinner": "Dishoom - Bombay-style Indian in a stunning setting"
        },
        "day3": {
            "morning": {"activity": "Hyde Park & Kensington Palace", "description": "Row boats on the Serpentine lake and explore royal gardens", "cost": 0, "booking": False},
            "afternoon": {"activity": "Natural History Museum & V&A", "description": "Dinosaur skeletons and incredible art collections", "cost": 0, "booking": False},
            "lunch": "South Kensington food market",
            "dinner": "Soho - endless dining options from around the world"
        },
        "transport_tips": "Get an Oyster card for tube and buses. Download Citymapper app.",
        "accommodation": "Stay in South Bank or Covent Garden for central location",
        "total_cost": 950,
        "packing_list": ["Umbrella", "Comfortable walking shoes", "Adapter (Type G)", "Light jacket"],
        "local_tips": [
            "Double-decker buses are a great way to see the city",
            "Many museums are free (British Museum, Natural History Museum)",
            "Book theater tickets in advance for West End shows",
            "Stand on the right, walk on the left on escalators"
        ]
    }


def _paris_content() -> dict:
    return {
        "day1": {
            "morning": {"activity": "Eiffel Tower & Champ de Mars", "description": "Take the elevator to the top for breathtaking city views. Picnic on the lawn after!", "cost": 25, "booking": True},
            "afternoon": {"activity": "Seine River Cruise", "description": "See Notre-Dame, Louvre, and Orsay from the water. Golden hour is magical.", "cost": 15, "booking": False},
            "lunch": "Rue Cler market street - grab fresh baguette, cheese, and wine for a picnic",
            "dinner": "Le Comptoir du Relais - classic French bistro in Saint-Germain"
        },
        "day2": {
            "morning": {"activity": "Louvre Museum", "description": "Mona Lisa, Venus de Milo, and countless masterpieces. Go early to avoid crowds!", "cost": 17, "booking": True},
            "afternoon": {"activity": "Montmartre & Sacré-Cœur", "description": "Bohemian streets, artists at Place du Tertre, and panoramic views", "cost": 0, "booking": False},
            "lunch": "Rue Lepic - where Amélie was filmed, great cafes",
            "dinner": "Le Consulat - historic Montmartre bistro"
        },
        "day3": {
            "morning": {"activity": "Notre-Dame & Île de la Cité", "description": "Restored cathedral and the historic heart of Paris", "cost": 0, "booking": False},
            "afternoon": {"activity": "Le Marais & Place des Vosges", "description": "Historic Jewish quarter, trendy boutiques, and Paris's oldest planned square", "cost": 0, "booking": False},
            "lunch": "L'As du Fallafel - famous falafel in the Marais",
            "dinner": "Breizh Cafe - incredible organic crepes"
        },
        "transport_tips": "Use the Metro - buy a carnet of 10 tickets. It's fast and efficient.",
        "accommodation": "Stay in Le Marais or Saint-Germain for charm and central location",
        "total_cost": 1250,
        "packing_list": ["Comfortable walking shoes", "Camera", "European adapter", "Light jacket"],
        "local_tips": [
            "Learn a few basic French phrases - locals appreciate the effort",
            "Tipping is included in restaurant bills, but rounding up is appreciated",
            "Book popular attractions online in advance to skip lines",
            "Many museums are free on the first Sunday of each month"
        ]
    }


def _tokyo_content() -> dict:
    return {
        "day1": {
            "morning": {"activity": "Senso-ji Temple & Asakusa", "description": "Tokyo's oldest temple with the famous Kaminarimon Gate and Nakamise shopping street", "cost": 0, "booking": False},
            "afternoon": {"activity": "Akihabara Electric Town", "description": "Gaming, anime, electronics, and maid cafes - otaku paradise!", "cost": 0, "booking": False},
            "lunch": "Ramen in Asakusa - Ichiran or local shop",
            "dinner": "Monjayaki in Tsukishima - Tokyo's famous savory pancake"
        },
        "day2": {
            "morning": {"activity": "Meiji Shrine & Harajuku", "description": "Serene forest shrine followed by Takeshita Street's crazy fashion and crepes", "cost": 0, "booking": False},
            "afternoon": {"activity": "Shibuya Crossing & Hachiko", "description": "World's busiest intersection - watch from Starbucks or Mag's Park rooftop", "cost": 0, "booking": False},
            "lunch": "Uobei Shibuya - conveyor belt sushi with touch screens",
            "dinner": "Omoide Yokocho - 'Piss Alley' tiny yakitori bars"
        },
        "day3": {
            "morning": {"activity": "Tsukiji Outer Market", "description": "Fresh seafood, street food, and the best tuna donburi", "cost": 20, "booking": False},
            "afternoon": {"activity": "teamLab Planets", "description": "Immersive digital art museum - walk through water and gardens", "cost": 32, "booking": True},
            "lunch": "Tsukiji market - uni, tamagoyaki, and fresh sushi",
            "dinner": "Shinjuku - Golden Gai for tiny bars and izakaya"
        },
        "transport_tips": "Get a Suica or Pasmo card. The Yamanote Line loops through all major areas.",
        "accommodation": "Stay near Shinjuku or Shibuya for convenience",
        "total_cost": 1100,
        "packing_list": ["Portable Wi-Fi", "Comfortable shoes", "Power adapter (Type A/B)", "Small towel"],
        "local_tips": [
            "Trains are punctual - don't be late",
            "Remove shoes when entering temples and some restaurants",
            "Cash is still king - carry enough yen",
            "Learn: Arigato (thank you), Sumimasen (excuse me)"
        ]
    }


def _rome_content() -> dict:
    return {
        "day1": {
            "morning": {"activity": "Colosseum & Roman Forum", "description": "Walk where gladiators fought and emperors ruled. Book the underground tour!", "cost": 18, "booking": True},
            "afternoon": {"activity": "Palatine Hill & Circus Maximus", "description": "Birthplace of Rome with incredible views of the Forum", "cost": 12, "booking": False},
            "lunch": "Trattoria near Colosseum for carbonara",
            "dinner": "Monti district - trendy eateries and wine bars"
        },
        "day2": {
            "morning": {"activity": "Vatican Museums & Sistine Chapel", "description": "Michelangelo's masterpiece and endless galleries. Book 2 months ahead!", "cost": 17, "booking": True},
            "afternoon": {"activity": "St. Peter's Basilica & Dome Climb", "description": "Climb 551 steps for the best view of Rome", "cost": 10, "booking": False},
            "lunch": "Pizza al Taglio near Vatican",
            "dinner": "Trastevere - cobblestone streets with authentic trattorias"
        },
        "day3": {
            "morning": {"activity": "Trevi Fountain & Spanish Steps", "description": "Toss a coin to ensure your return to Rome!", "cost": 0, "booking": False},
            "afternoon": {"activity": "Pantheon & Piazza Navona", "description": "Ancient temple turned church, then Bernini's fountains", "cost": 0, "booking": False},
            "lunch": "Near Pantheon - classic Roman pizza bianca",
            "dinner": "Jewish Ghetto - carciofi alla giudia (fried artichokes)"
        },
        "transport_tips": "Rome is very walkable. Use metro for Vatican and Colosseum.",
        "accommodation": "Stay in Trastevere or near Piazza Navona",
        "total_cost": 1150,
        "packing_list": ["Comfortable shoes", "Sun hat", "Power adapter (Type F/L)", "Modest church clothing"],
        "local_tips": [
            "Book Vatican and Colosseum tickets weeks in advance",
            "Cover shoulders and knees when entering churches",
            "Coffee at the bar is cheaper than sitting at a table",
            "Validate train/bus tickets before boarding"
        ]
    }


def _default_content(destination: str) -> dict:
    return {
        "day1": {
            "morning": {"activity": "City Center Walking Tour", "description": f"Discover the main squares and landmarks of {destination}", "cost": 25, "booking": False},
            "afternoon": {"activity": "Historic Museum", "description": f"Learn about the rich history and culture of {destination}", "cost": 15, "booking": False},
            "lunch": "Popular local cafe in the city center",
            "dinner": "Traditional restaurant in the old town"
        },
        "day2": {
            "morning": {"activity": "Local Market", "description": f"Experience authentic daily life and taste local specialties in {destination}", "cost": 0, "booking": False},
            "afternoon": {"activity": "Art Gallery or Architecture Tour", "description": f"Discover the creative side and architectural beauty of {destination}", "cost": 12, "booking": False},
            "lunch": "Market food hall with local vendors",
            "dinner": "Trendy neighborhood hotspot"
        },
        "day3": {
            "morning": {"activity": "Park or Garden", "description": f"Relax in the beautiful green spaces of {destination}", "cost": 0, "booking": False},
            "afternoon": {"activity": "Shopping District", "description": f"Browse boutiques and find unique souvenirs in {destination}", "cost": 0, "booking": False},
            "lunch": "Cafe with people-watching opportunities",
            "dinner": "Rooftop restaurant with city views"
        },
        "transport_tips": "Public transport is efficient and affordable. Consider a day pass.",
        "accommodation": "Centrally located hotel or Airbnb",
        "total_cost": 850,
        "packing_list": ["Passport", "Comfortable walking shoes", "Camera", "Power adapter"],
        "local_tips": [
            f"Learn a few basic local phrases in {destination}",
            "Check local events and festivals during your visit",
            "Book popular attractions online in advance to skip lines",
            "Ask locals for restaurant recommendations"
        ]
    }