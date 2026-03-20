import os
from sqlalchemy import create_engine, Column, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set. Check your .env file")

# For Neon PostgreSQL, we need SSL
if "neon.tech" in DATABASE_URL:
    # Remove any existing sslmode and let SQLAlchemy handle it
    DATABASE_URL = DATABASE_URL.split("?")[0]
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        pool_size=5,
        max_overflow=10,
        pool_pre_ping=True,
        connect_args={"sslmode": "require"}  # Explicitly set SSL mode
    )
else:
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        pool_size=5,
        max_overflow=10,
        pool_pre_ping=True
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class Itinerary(Base):
    __tablename__ = "itineraries"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    destination = Column(String, nullable=False)
    preferences = Column(JSON, nullable=False)
    itinerary_data = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    session_id = Column(String, index=True, nullable=True)
    ip_address = Column(String, nullable=True)

def init_db():
    """Create tables if they don't exist"""
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created/verified")
        return True
    except Exception as e:
        print(f"❌ Database initialization error: {e}")
        raise

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()