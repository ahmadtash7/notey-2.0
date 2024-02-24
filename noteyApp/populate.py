from models import TopicTable

topics = {
    1: 'Religious Islamic Thinkers of the 18th & 19th Centuries',
    2: 'Decline of the Mughal Empire',
    3: 'War of Independence (1857-1858)',
    4: 'Importance of Sir Syed Ahmed Khan',
    5: 'Urdu and Regional Languages',
    6: 'Development of the Pakistan Movement (Early 20th Century)',
    7: 'Khilafat Movement',
    8: 'Pakistan Movement (1927-1939)',
    9: 'Problems in the Sub-Continent (1940-1947)',
    10: 'Contributions of Jinnah, Allama Iqbal, and Rehmat Ali to the Pakistan Movement',
    11: 'Establishment of Pakistan (1947-1948)',
    12: 'Stability following the death of Jinnah',
    13: 'Reasons for the formation of Bangladesh',
    14: 'Pakistan the 20 years following the "Decade of Progress"',
    15: 'Governance (1990-1999)',
    16: 'International Affairs'
}

for topic in topics.values():
   
    t = TopicTable.objects.create(name=topic)
    t.save()