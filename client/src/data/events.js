const images = {
	hackathon:
		'https://cdn.prod.website-files.com/619cef5c40cb8925cd33ece3/621e3c9005658fc23c531509_619cef5c40cb89bb5133f8c6_template-vignette-HACKATHON-1200x900-FR.png',
	concert: 'https://www.shutterstock.com/image-vector/talent-show-color-full-poster-260nw-2188491349.jpg',
	conference: 'https://t3.ftcdn.net/jpg/04/55/48/14/360_F_455481490_oJe1oPfAHrEwJVU3fBWvcSEhvqnZFZVW.jpg',
	talkshow: 'https://t3.ftcdn.net/jpg/04/55/48/14/360_F_455481490_oJe1oPfAHrEwJVU3fBWvcSEhvqnZFZVW.jpg',
	workshop:
		'https://shop.radikalneonsigns.com/cdn/shop/products/BlushPink_fce8da6f-79b2-416f-ba19-8605541e40f8_1200x1200.jpg?v=1675876702',
	party: 'https://www.shutterstock.com/image-photo/colorful-party-background-with-confetti-260nw-2228021300.jpg',
	'motivational speech':
		'https://img.freepik.com/premium-vector/if-you-never-try-you-ll-never-know-neon-signs-modern-quote-inspiration-motivation-neon-style_118419-451.jpg',
	meetup: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOGZuqKp5Be_nZhw9CLN7QOjW31qlBoYcdA&s'
}

export const items = [
	{
		id: 1,
		title: 'Tech Stress Management',
		description: 'Learn techniques to manage stress in the tech industry',
		date: '2023-09-15',
		time: '18:00',
		type: 'Workshop',
		venue: 'Online',
		link: 'https://www.meetup.com/dhaka-startup-idea-to-ipo/events/303625902/?recId=0ce738cf-eeb0-4bc8-8972-d3e7ba26d011&recSource=keyword_search&searchId=602a09b9-7eed-4bec-9284-0a70d732175c&eventOrigin=find_page$all&_gl=1*1vaz2jm*_up*MQ..*_ga*Nzc5MjY4NDUyLjE3Mjc1NDExNzc.*_ga_NP82XMKW0P*MTcyNzU0MTE3Ni4xLjAuMTcyNzU0MTE3Ni4wLjAuMA..',
		image: images.workshop,
		price: 0
	},
	{
		id: 2,
		title: 'Ureck-a-thon',
		description: 'Develop solutions for student mental health',
		date: '2023-09-20',
		time: '09:00',
		type: 'Hackathon',
		venue: 'Tech Hub, Downtown',
		link: 'https://ureck-a-thon.uem.edu.in/',
		image: images.hackathon,
		price: 50
	},
	{
		id: 3,
		title: 'Mindfulness for Programmers',
		description: 'Incorporate mindfulness into your coding routine',
		date: '2023-09-25',
		time: '20:00',
		type: 'Talkshow',
		venue: 'Online',
		link: 'https://www.meetup.com/dhaka-startup-idea-to-ipo/events/303625902/?recId=0ce738cf-eeb0-4bc8-8972-d3e7ba26d011&recSource=keyword_search&searchId=602a09b9-7eed-4bec-9284-0a70d732175c&eventOrigin=find_page$all&_gl=1*1vaz2jm*_up*MQ..*_ga*Nzc5MjY4NDUyLjE3Mjc1NDExNzc.*_ga_NP82XMKW0P*MTcyNzU0MTE3Ni4xLjAuMTcyNzU0MTE3Ni4wLjAuMA..',
		image: images.talkshow,
		price: 15
	},
	{
		id: 4,
		title: 'Balancing Work and Mental Health',
		description: 'Strategies for maintaining work-life balance',
		date: '2023-09-30',
		time: '19:00',
		type: 'Motivational Speech',
		venue: 'City Conference Center',
		link: 'https://www.meetup.com/kolkata-life-coaching-and-neurological-repatterning-meetup/events/303272506/?recId=20522534-cb11-4a5a-aa29-22568250e2b7&recSource=keyword_search&searchId=8e0681ae-6a48-421a-9346-7573b574d704&eventOrigin=find_page$all&_gl=1*1jnehub*_up*MQ..*_ga*Nzc5MjY4NDUyLjE3Mjc1NDExNzc.*_ga_NP82XMKW0P*MTcyNzU0MTE3Ni4xLjAuMTcyNzU0MTE3Ni4wLjAuMA..',
		image: images['motivational speech'],
		price: 100
	},
	{
		id: 5,
		title: 'Coding and Creativity Meetup',
		description: 'Explore the intersection of coding and mental wellbeing',
		date: '2023-10-05',
		time: '18:30',
		type: 'Meetup',
		venue: 'Tech Cafe',
		link: 'https://www.meetup.com/kolkata-life-coaching-and-neurological-repatterning-meetup/events/303272506/?recId=20522534-cb11-4a5a-aa29-22568250e2b7&recSource=keyword_search&searchId=8e0681ae-6a48-421a-9346-7573b574d704&eventOrigin=find_page$all&_gl=1*1jnehub*_up*MQ..*_ga*Nzc5MjY4NDUyLjE3Mjc1NDExNzc.*_ga_NP82XMKW0P*MTcyNzU0MTE3Ni4xLjAuMTcyNzU0MTE3Ni4wLjAuMA..',
		image: images.meetup,
		price: 5
	},
	{
		id: 6,
		title: 'Drive Blaze',
		description: 'Drive the tech Blaze',
		date: '2023-10-05',
		time: '18:30',
		type: 'Meetup',
		venue: 'Tech Cafe',
		link: 'https://www.meetup.com/kolkata-life-coaching-and-neurological-repatterning-meetup/events/303272506/?recId=20522534-cb11-4a5a-aa29-22568250e2b7&recSource=keyword_search&searchId=8e0681ae-6a48-421a-9346-7573b574d704&eventOrigin=find_page$all&_gl=1*1jnehub*_up*MQ..*_ga*Nzc5MjY4NDUyLjE3Mjc1NDExNzc.*_ga_NP82XMKW0P*MTcyNzU0MTE3Ni4xLjAuMTcyNzU0MTE3Ni4wLjAuMA..',
		image: images.hackathon,
		price: 5
	}
]
