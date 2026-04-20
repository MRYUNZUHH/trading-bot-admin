import os
import sys

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

try:
    from app.core.config import settings
    from app.core.database import engine, Base, SessionLocal
    from app.core.security import get_password_hash
    from app.models.admin import AdminUser
    from app.models.plan import Plan
    from app.models.bot_config import BotConfig
    
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created")
    
    db = SessionLocal()
    
    # Create admin
    admin = db.query(AdminUser).filter(AdminUser.email == "admin@tradingbot.com").first()
    if not admin:
        admin = AdminUser(
            email="admin@tradingbot.com",
            full_name="Super Admin",
            hashed_password=get_password_hash("Admin123!"),
            role="super_admin",
            is_active=True,
            is_superuser=True
        )
        db.add(admin)
        print("✓ Admin created")
    else:
        print("✓ Admin already exists")
    
    # Create plans
    plans = [
        {"name": "Free", "code": "free", "daily_signal_limit": 3, "price_monthly": 0, "price_yearly": 0, "sort_order": 1},
        {"name": "Premium", "code": "premium", "daily_signal_limit": 10, "price_monthly": 49.99, "price_yearly": 499.99, "sort_order": 2},
        {"name": "Pro", "code": "pro", "daily_signal_limit": 999, "price_monthly": 99.99, "price_yearly": 999.99, "sort_order": 3}
    ]
    
    for p in plans:
        plan = db.query(Plan).filter(Plan.code == p["code"]).first()
        if not plan:
            db.add(Plan(**p))
            print(f"✓ Created {p['name']} plan")
    
    # Create config
    config = db.query(BotConfig).first()
    if not config:
        db.add(BotConfig(brand_name="Trading Bot Pro"))
        print("✓ Config created")
    
    db.commit()
    db.close()
    
    print("\n✅ Setup complete!")
    print("\nLogin credentials:")
    print("  Email: admin@tradingbot.com")
    print("  Password: Admin123!")
    print("\nRun the server with: .\\venv\\Scripts\\python.exe run.py")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
