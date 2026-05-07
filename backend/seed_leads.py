import os
# pyrefly: ignore [missing-import]
import django
import random
from decimal import Decimal

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'uplift_backend.settings')
django.setup()

from leads.models import Lead

def seed_data():
    names = [
        "Kasun Kalhara", "Chamari Atapattu", "Pathum Nissanka", "Wanindu Hasaranga",
        "Nuwan Kulasekara", "Mahela Jayawardene", "Kumar Sangakkara", "Lasith Malinga",
        "Angelo Mathews", "Dimuth Karunaratne", "Dinesh Chandimal", "Kusal Mendis",
        "Charith Asalanka", "Bhanuka Rajapaksa", "Lahiru Kumara", "Binura Fernando",
        "Dunith Wellalage", "Kamindu Mendis", "Asitha Fernando", "Vishwa Fernando"
    ]
    
    companies = [
        "Dialog Axiata", "Sri Lanka Telecom", "John Keells Holdings", "Hayleys PLC",
        "MAS Holdings", "Brandix Lanka", "Hemas Holdings", "Commercial Bank",
        "Hatton National Bank", "Sampath Bank", "Aitken Spence", "DFCC Bank",
        "Expolanka Holdings", "Lanka IOC", "Softlogic Holdings", "Access Engineering",
        "Cargills Ceylon", "Vallibel One", "Richard Pieris & Co", "Lanka Walltiles"
    ]
    
    statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost']
    sources = ['Website', 'Referral', 'LinkedIn', 'Facebook', 'Cold Call', 'Email Campaign']
    salespeople = ['Amila Perera', 'Sunil Jayasundara', 'Nimal Siriwardena', 'Kamal Gunaratne']

    # Clear existing leads if any (optional, but good for a fresh start)
    # Lead.objects.all().delete()

    created_count = 0
    for i in range(20):
        name = random.choice(names)
        company = random.choice(companies)
        email = f"{name.lower().replace(' ', '.')}@{company.lower().replace(' ', '')}.lk"
        status = random.choice(statuses)
        source = random.choice(sources)
        salesperson = random.choice(salespeople)
        deal_value = Decimal(random.randrange(10000, 5000000, 5000))
        
        Lead.objects.create(
            name=name,
            email=email,
            phone=f"07{random.randint(0, 9)}{random.randint(1000000, 9999999)}",
            company=company,
            status=status,
            source=source,
            salesperson=salesperson,
            deal_value=deal_value
        )
        created_count += 1
    
    print(f"Successfully seeded {created_count} Sri Lankan leads!")

if __name__ == "__main__":
    seed_data()
