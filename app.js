// Angie's Bakery Collection - Application Logic & Scaler Engine

// Global State
let currentScale = 1;
let currentCategory = 'all';
let dialogueCategory = 'greetings';

// Recipe Database
const recipes = [
    {
        id: 'nutella',
        name: 'Hazelnut Nutella Cookie',
        nameTh: 'คุกกี้เฮเซลนัท นูเทลล่าไส้เยิ้ม',
        category: 'choc nut',
        categoryName: 'ช็อกโกแลต & ถั่ว',
        sweetness: 4,
        yieldBase: 36,
        yieldUnit: 'ชิ้น (ก้อนละ 25g)',
        origins: ['🇫🇷 ฝรั่งเศส', '🇧🇪 เบลเยียม', '🇮🇹 อิตาลี'],
        heroIngredient: 'Callebaut 57.9% Dark Couverture 🇧🇪 + Real Nutella Core 🇮🇹',
        ingredients: [
            { name: 'เนยชนิดเค็ม (Salted Butter 🇫🇷)', baseGrams: 135, unit: 'กรัม' },
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 105, unit: 'กรัม' },
            { name: 'น้ำตาลทรายแดงเบเกอรี่', baseGrams: 105, unit: 'กรัม' },
            { name: 'ไข่ไก่สด', baseGrams: 54, unit: 'กรัม (~1 ฟอง)' },
            { name: 'แป้งสาลีอเนกประสงค์', baseGrams: 243, unit: 'กรัม' },
            { name: 'เบกกิ้งโซดา', baseGrams: 1.05, unit: 'กรัม (3/4 ช้อนชา)' },
            { name: 'เกลือป่น', baseGrams: 4.5, unit: 'กรัม' },
            { name: 'ผงฟู', baseGrams: 3, unit: 'กรัม (3/4 ช้อนชา)' },
            { name: 'Callebaut - 57.9% Dark Couverture (เบลเยียม 🇧🇪)', baseGrams: 150, unit: 'กรัม' },
            { name: 'เฮเซลนัทแกะเปลือก (อบตกแต่ง)', baseGrams: 72, unit: 'กรัม (4 ซีก/ชิ้น)' },
            { name: 'Nutella 🇮🇹 (สำหรับฉีดไส้ขณะร้อน)', baseGrams: 180, unit: 'กรัม' }
        ],
        steps: [
            'อบเฮเซลนัทแกะเปลือกที่อุณหภูมิ 150-160°C เป็นเวลา 6-7 นาที จนออกสีเหลืองหอม พักไว้',
            'ตีเนยสดชนิดเค็มกับน้ำตาลทรายขาวและน้ำตาลทรายแดงให้พอเข้ากันเป็นเนื้อเดียว (อย่าตีฟู)',
            'ค่อยๆ เติมไข่ไก่ลงไปผสม ให้น้ำกับน้ำมันเข้ากัน',
            'ร่อนแป้ง เบกกิ้งโซดา เกลือ ผงฟู ลงผสม พอเข้ากัน 80% แล้วเติม Callebaut Dark Couverture 57.9% 🇧🇪 ลงไปคลุก',
            'นำเข้าแช่แข็งเป็นเวลา 30 นาที',
            'ปั้นแป้งเป็นก้อน ชิ้นละ 25 กรัม ด้วยที่ตักไอศกรีม นำแช่เย็นช่องธรรมดาต่ออีก 30 นาที',
            'เข้าอบที่อุณหภูมิ 150-160°C เป็นเวลา 10-12 นาที',
            'นำออกจากเตาอบ ฉีด Nutella 🇮🇹 เข้าไปตรงกลางคุกกี้ทันทีขณะร้อนๆ แล้ววางตกแต่งด้วยเฮเซลนัท 4 ซีก'
        ]
    },
    {
        id: 'dccc',
        name: 'Double Choc Chip Cookie (DCCC)',
        nameTh: 'ดับเบิ้ลช็อกโกแลตชิพคุกกี้ ท็อปทอฟฟี่',
        category: 'choc',
        categoryName: 'ช็อกโกแลตเข้มข้น',
        sweetness: 2,
        yieldBase: 27,
        yieldUnit: 'ชิ้น (ก้อนละ 25g)',
        origins: ['🇫🇷 ฝรั่งเศส'],
        heroIngredient: 'Cacao Barry Extra Brute 🇫🇷 & Mi-Amère 58% 🇫🇷 + Flaky Sea Salt',
        ingredients: [
            { name: 'เนยชนิดเค็ม (Salted Butter 🇫🇷)', baseGrams: 150, unit: 'กรัม' },
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 93, unit: 'กรัม' },
            { name: 'น้ำตาลทรายแดงเบเกอรี่', baseGrams: 120, unit: 'กรัม' },
            { name: 'กากน้ำตาล (Molasses)', baseGrams: 9, unit: 'กรัม' },
            { name: 'ไข่ไก่สด', baseGrams: 54, unit: 'กรัม (~1 ฟอง)' },
            { name: 'แป้งสาลีอเนกประสงค์', baseGrams: 171, unit: 'กรัม' },
            { name: 'ผงโกโก้ Cacao Barry Extra Brute (ฝรั่งเศส 🇫🇷)', baseGrams: 45, unit: 'กรัม' },
            { name: 'เบกกิ้งโซดา', baseGrams: 2.1, unit: 'กรัม (1/2 ช้อนชา)' },
            { name: 'Cacao Barry Mi-Amère 58% (ฝรั่งเศส 🇫🇷)', baseGrams: 100, unit: 'กรัม' },
            { name: 'ชิ้นน้ำตาลทอฟฟี่เนยสด (Toffee 🇫🇷)', baseGrams: 60, unit: 'กรัม' },
            { name: 'ดอกเกลือ (Flaky Sea Salt)', baseGrams: 3, unit: 'กรัม (สำหรับโรยหน้า)' }
        ],
        steps: [
            'ผสมเนยสด น้ำตาลทรายแดง กากน้ำตาล น้ำตาลทรายขาว และเกลือ ให้เข้ากันจนเนียนเป็นเนื้อครีม',
            'ค่อยๆ เติมไข่ไก่ลงไปผสมจนเข้ากันดี',
            'ร่อนแป้งสาลี พร้อมกับเบกกิ้งโซดาและผงโกโก้ Cacao Barry Extra Brute 🇫🇷',
            'ใส่ส่วนผสมแห้งลงในส่วนเนย ผสมเข้ากัน แล้วเติม Cacao Barry 58% 🇫🇷 ลงไปผสม',
            'นำเข้าแช่เย็น 30 นาที แล้วปั้นก้อนละ 25 กรัม',
            'เข้าอบที่อุณหภูมิ 160°C เป็นเวลา 8 นาที จากนั้นวางชิ้นน้ำตาลทอฟฟี่ข้างบน แล้วอบต่ออีก 2-3 นาทีจนทอฟฟี่เยิ้ม',
            'หลังอบเสร็จ โรยหน้าคุกกี้ด้วยดอกเกลือทันทีขณะที่ยังร้อนๆ'
        ]
    },
    {
        id: 'redvelvet',
        name: 'Red Velvet Cookie with Chocolate Chips',
        nameTh: 'เรดเวลเว็ทคุกกี้ ช็อกโกแลตชิพส์',
        category: 'choc',
        categoryName: 'ช็อกโกแลตคลาสสิก',
        sweetness: 3,
        yieldBase: 22,
        yieldUnit: 'ชิ้น',
        origins: ['🇫🇷 ฝรั่งเศส', '🇲🇬 มาดากัสการ์'],
        heroIngredient: 'Pure French Cocoa 🇫🇷 + Semi-Sweet Chocolate Chips',
        ingredients: [
            { name: 'เนยชนิดเค็ม (Salted Butter 🇫🇷)', baseGrams: 115, unit: 'กรัม' },
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 80, unit: 'กรัม' },
            { name: 'น้ำตาลทรายแดงเบเกอรี่', baseGrams: 80, unit: 'กรัม' },
            { name: 'ไข่ไก่เบอร์ 2', baseGrams: 50, unit: 'กรัม (1 ฟอง)' },
            { name: 'Vanilla Extract (มาดากัสการ์ 🇲🇬)', baseGrams: 5, unit: 'กรัม (1 ช้อนชา)' },
            { name: 'สีแดงสด (Food Color)', baseGrams: 10, unit: 'กรัม (2 ช้อนชา)' },
            { name: 'แป้งว่าว (สาลีอเนกประสงค์)', baseGrams: 180, unit: 'กรัม' },
            { name: 'ผงโกโก้พรีเมียม Cacao Barry (ฝรั่งเศส 🇫🇷)', baseGrams: 20, unit: 'กรัม' },
            { name: 'เบกกิ้งโซดา', baseGrams: 0.7, unit: 'กรัม (1/2 ช้อนชา)' },
            { name: 'เกลือป่น', baseGrams: 1.5, unit: 'กรัม (1/4 ช้อนชา)' },
            { name: 'เซมิ-สวีทช็อกโกแลตชิพส์ (Semi-Sweet Choc Chips)', baseGrams: 120, unit: 'กรัม' }
        ],
        steps: [
            'ตีเนยสดด้วยเครื่องให้พอแตกตัว',
            'ใส่น้ำตาลทรายแดงและขาว ตีด้วยสปีดสูงสุด 3 นาที และปาดโถ',
            'ใส่ไข่ วนิลา 🇲🇬 และสีแดงสด เข้าด้วยกันด้วยสปีดกลาง',
            'ร่อนแป้ง โกโก้ฝรั่งเศส 🇫🇷 เกลือป่น เบกกิ้งโซดา ผสมเข้าด้วยกันด้วยสปีดต่ำ',
            'นำช็อกโกแลตชิพส์ใส่ ผสมด้วย Spatula แล้วปิดด้วย Wrap',
            'นำเข้าตู้เย็นช่องธรรมดา 2 ชม. ขึ้นไป หรือช่องฟรีซ 20-40 นาที',
            'ใช้ที่ตักไอศกรีมเล็ก วางบนถาดอบคุกกี้ วางเรียงกัน 8 ชิ้น',
            'ตั้งเตาอบ 180°C (พัดลม 150-160°C) อบ 12-15 นาที พักบนตะแกรงจนเย็น'
        ]
    },
    {
        id: 'pistachio',
        name: 'Pistachio Cookie with Homemade Praline',
        nameTh: 'คุกกี้พิสตาชิโอพราลีน & รูบี้ช็อกโกแลต',
        category: 'nut',
        categoryName: 'ถั่ว & พรีเมียมพราลีน',
        sweetness: 2,
        yieldBase: 30,
        yieldUnit: 'ชิ้น (ก้อนละ 60g บิ๊กไซส์)',
        origins: ['🇫🇷 ฝรั่งเศส', '🇧🇪 เบลเยียม'],
        heroIngredient: 'Ground Pistachio + Homemade Praline + Ruby Choc 🇧🇪',
        ingredients: [
            { name: 'เนยสด (Butter 🇫🇷)', baseGrams: 132, unit: 'กรัม' },
            { name: 'น้ำตาลทรายแดงเบเกอรี่', baseGrams: 150, unit: 'กรัม' },
            { name: 'พิสตาชิโอปั่นละเอียด (Ground Pistachio)', baseGrams: 66, unit: 'กรัม' },
            { name: 'เกลือป่น', baseGrams: 1.5, unit: 'กรัม' },
            { name: 'ไข่ไก่สด', baseGrams: 60, unit: 'กรัม (1 ฟองใหญ่)' },
            { name: 'แป้งว่าว (สาลีอเนกประสงค์)', baseGrams: 195, unit: 'กรัม' },
            { name: 'ผงฟู', baseGrams: 6, unit: 'กรัม' },
            { name: 'ช็อกโกแลตชิป RUBY Callebaut (เบลเยียม 🇧🇪)', baseGrams: 150, unit: 'กรัม' },
            { name: 'ถั่วพิสตาชิโอ (เม็ดอบแล้วบดแต่งหน้า)', baseGrams: 54, unit: 'กรัม' },
            { name: 'ไส้พราลีนพิสตาชิโอทำเอง (Homemade Praline)', baseGrams: 120, unit: 'กรัม' }
        ],
        steps: [
            'ผสมเนยสด 🇫🇷 น้ำตาลทรายแดง พิสตาชิโอบด และเกลือ ให้เป็นเนื้อครีม',
            'ค่อยๆ เติมไข่ลงไปผสม แล้วร่อนแป้งพร้อมผงฟูใส่ลงไป',
            'ใส่ช็อกโกแลตชิปรูบี้ 🇧🇪 และถั่วพิสตาชิโออบบดลงไปผสม',
            'นำเข้าแช่เย็น 30 นาที แบ่งแป้งโดชิ้นละ 60 กรัม คลึงกลมและกดบางบนถาดอบ',
            'เข้าอบที่อุณหภูมิ 160°C เป็นเวลา 8 นาที จากนั้นขึ้นรูปและอบต่ออีก 6 นาที',
            'หลังอบเสร็จ ราดไส้พราลีนพิสตาชิโอเคี่ยวเองสดๆ และโรยช็อกโกแลตชิปรูบี้ 🇧🇪 ขณะร้อน'
        ]
    },
    {
        id: 'ruby',
        name: 'Chocolate Ruby Cookie (CRC)',
        nameTh: 'คุกกี้ช็อกโกแลต รูบี้พรีเมียม',
        category: 'special choc',
        categoryName: 'เบลเยียมรูบี้ช็อกโกแลต',
        sweetness: 3,
        yieldBase: 36,
        yieldUnit: 'ชิ้น (ก้อนละ 25g)',
        origins: ['🇫🇷 ฝรั่งเศส', '🇧🇪 เบลเยียม'],
        heroIngredient: 'Callebaut Ruby Choc 33.6% RB1 🇧🇪 & Milk Couverture 🇧🇪',
        ingredients: [
            { name: 'เนยชนิดเค็ม (Salted Butter 🇫🇷)', baseGrams: 135, unit: 'กรัม' },
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 105, unit: 'กรัม' },
            { name: 'น้ำตาลทรายแดงเบเกอรี่', baseGrams: 105, unit: 'กรัม' },
            { name: 'ไข่ไก่สด', baseGrams: 66, unit: 'กรัม' },
            { name: 'แป้งสาลีอเนกประสงค์', baseGrams: 213, unit: 'กรัม' },
            { name: 'เบกกิ้งโซดา', baseGrams: 2.1, unit: 'กรัม (1+1/2 ช้อนชา)' },
            { name: 'เกลือป่น', baseGrams: 4.5, unit: 'กรัม' },
            { name: 'ผงฟู', baseGrams: 3, unit: 'กรัม (3/4 ช้อนชา)' },
            { name: 'Callebaut Ruby Choc 33.6% RB1 (เบลเยียม 🇧🇪)', baseGrams: 84, unit: 'กรัม' },
            { name: 'Callebaut Milk Couverture 33.6% (เบลเยียม 🇧🇪)', baseGrams: 84, unit: 'กรัม' }
        ],
        steps: [
            'ตีเนยกับน้ำตาลให้เข้ากันจนเนียนเป็นเนื้อเดียว (อย่าตีฟู)',
            'ค่อยๆ เติมไข่ลงไปผสมให้เข้ากัน',
            'ผสมส่วนแป้ง+ของผง ร่อนเข้ากัน 80% แล้วเติมช็อกโกแลตชิป Ruby 🇧🇪 และ Milk Couverture 🇧🇪 ลงไป',
            'แช่แข็ง 30 นาที แล้วปั้นก้อนละ 25 กรัม แช่เย็นช่องธรรมดาต่อ 30 นาที',
            'เข้าอบที่อุณหภูมิ 150-160°C เป็นเวลา 10-12 นาที'
        ]
    },
    {
        id: 'matcha',
        name: 'Matcha Macadamia Cookie (MMC)',
        nameTh: 'คุกกี้มัทฉะ แมคคาเดเมีย ไวท์ช็อกแท้',
        category: 'special nut',
        categoryName: 'มัทฉะแท้ & ไวท์ช็อกเบลเยียม',
        sweetness: 3,
        yieldBase: 36,
        yieldUnit: 'ชิ้น (ก้อนละ 25g)',
        origins: ['🇫🇷 ฝรั่งเศส', '🇯🇵 ญี่ปุ่น', '🇧🇪 เบลเยียม', '🇦🇺 ออสเตรเลีย'],
        heroIngredient: 'Pure Matcha 🇯🇵 + Callebaut White Couverture 28% 🇧🇪',
        ingredients: [
            { name: 'เนยชนิดเค็ม (มีเกลืออยู่ 2.7g) 🇫🇷', baseGrams: 180, unit: 'กรัม' },
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 140, unit: 'กรัม' },
            { name: 'น้ำตาลทรายแดงเบเกอรี่', baseGrams: 140, unit: 'กรัม' },
            { name: 'ไข่ไก่สด', baseGrams: 108, unit: 'กรัม (~2 ฟอง)' },
            { name: 'แป้งสาลีอเนกประสงค์', baseGrams: 300, unit: 'กรัม' },
            { name: 'ผงมัทฉะพรีเมียม (Matcha Powder ญี่ปุ่น 🇯🇵)', baseGrams: 24, unit: 'กรัม' },
            { name: 'เบกกิ้งโซดา', baseGrams: 1.4, unit: 'กรัม (1 ช้อนชา)' },
            { name: 'เกลือป่น', baseGrams: 2.25, unit: 'กรัม (3/8 ช้อนชา)' },
            { name: 'ผงฟู', baseGrams: 4, unit: 'กรัม (1 ช้อนชา)' },
            { name: 'Callebaut - White Couverture 28.0% (เบลเยียม 🇧🇪)', baseGrams: 100, unit: 'กรัม' },
            { name: 'แมคคาเดเมีย เม็ดซีก (ออสเตรเลีย 🇦🇺 อบแล้ว)', baseGrams: 18.8, unit: 'กรัม (4 ซีก/ชิ้น)' }
        ],
        steps: [
            'อบถั่ว Macadamia 🇦🇺 ที่อุณหภูมิ 150-160°C ประมาณ 6-7 นาที พอเหลืองหอม',
            'ตีเนยและน้ำตาลให้เข้ากันจนเนียน (อย่าตีฟู) เติมไข่ลงไปผสม',
            'ร่อนแป้ง ผงมัทฉะ 🇯🇵 เบกกิ้งโซดา เกลือ ผงฟู ผสมเข้าด้วยกัน แล้วใส่ Callebaut White Couverture 28% 🇧🇪',
            'แช่แข็ง 30 นาที ปั้นก้อนละ 25g แล้วแช่เย็น 30 นาที',
            'อบที่ 150-160°C เป็นเวลา 10-12 นาที นำออกมารออุ่น ตกแต่งด้วยแมคคาเดเมียชิ้นละ 4 ซีก'
        ]
    },
    {
        id: 'cornflake',
        name: 'Golden Cornflake Cookie (GCC)',
        nameTh: 'โกลเด้นคอร์นเฟลกคุกกี้ แครนเบอร์รี่',
        category: 'special',
        categoryName: 'คอร์นเฟลก & แครนเบอร์รี่',
        sweetness: 3,
        yieldBase: 39,
        yieldUnit: 'ชิ้น',
        origins: ['🇫🇷 ฝรั่งเศส', '🇲🇬 มาดากัสการ์', '🇺🇸 อเมริกา'],
        heroIngredient: 'Crispy Cornflakes + Whole Milk Powder + Cranberries 🇺🇸',
        ingredients: [
            { name: 'เนยชนิดเค็ม (Salted Butter 🇫🇷)', baseGrams: 225, unit: 'กรัม' },
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 125, unit: 'กรัม' },
            { name: 'ไข่ไก่เบอร์ 2', baseGrams: 51, unit: 'กรัม (1 ฟอง)' },
            { name: 'Vanilla Extract (มาดากัสการ์ 🇲🇬)', baseGrams: 5, unit: 'กรัม (1 ช้อนชา)' },
            { name: 'แป้งบัวแดง (แป้งเค้ก)', baseGrams: 300, unit: 'กรัม' },
            { name: 'ผงฟูดับเบิ้ลแอคชั่น', baseGrams: 4, unit: 'กรัม (1 ช้อนชา)' },
            { name: 'เกลือปรุงทิพย์', baseGrams: 1.5, unit: 'กรัม (1/4 ช้อนชา)' },
            { name: 'หัวนมผง 100%', baseGrams: 15, unit: 'กรัม (3 ช้อนชา)' },
            { name: 'เม็ดมะม่วงหิมพานต์ซีกบดหยาบ (อบแล้ว)', baseGrams: 100, unit: 'กรัม' },
            { name: 'แครนเบอร์รี่ (อเมริกา 🇺🇸 แช่น้ำ 10 นาที)', baseGrams: 100, unit: 'กรัม' },
            { name: 'Cornflakes เต็มแผ่น (สำหรับคลุก)', baseGrams: 150, unit: 'กรัม' }
        ],
        steps: [
            'อบเม็ดมะม่วงหิมพานต์ แช่แครนเบอร์รี่ 🇺🇸 ในน้ำ 10 นาที และบดคอร์นเฟลกบางส่วนให้แตก',
            'ตีเนยกับน้ำตาลทรายขาวด้วยสปีดสูงสุด 3 นาที ปาดโถ เติมไข่กับวนิลา 🇲🇬 ด้วยสปีดกลาง',
            'ร่อนแป้ง เกลือ ผงฟู หัวนมผง ผสมเข้ากัน แล้วใส่เม็ดมะม่วง แครนเบอร์รี่ 🇺🇸 ผสมด้วย Spatula',
            'ใช้ที่ตักไอศกรีมตักโด คลุกด้วย Cornflakes เต็มแผ่นให้ทั่ว วางบนถาดอบกดให้แบนเล็กน้อย',
            'ตั้งเตาอบ 180°C (พัดลม 150-160°C) อบ 12-15 นาที'
        ]
    },
    {
        id: 'sub-praline',
        name: 'Sub-Recipe: Homemade Pistachio Praline',
        nameTh: 'สูตรซอสพราลีนพิสตาชิโอทำเอง (Pistachio Sauce)',
        category: 'sub',
        categoryName: 'ซอส & ท็อปปิ้งทำเอง',
        sweetness: 2,
        yieldBase: 210,
        yieldUnit: 'กรัม',
        origins: [],
        heroIngredient: '100% Pure Pistachio + Rice Bran Oil + Whole Milk Powder',
        ingredients: [
            { name: 'ถั่วพิสตาชิโอ (ปั่นละเอียด)', baseGrams: 125, unit: 'กรัม' },
            { name: 'น้ำมันรำข้าว', baseGrams: 50, unit: 'กรัม' },
            { name: 'หัวนมผง 100%', baseGrams: 15, unit: 'กรัม' },
            { name: 'น้ำตาลไอซิ่ง', baseGrams: 20, unit: 'กรัม' },
            { name: 'เกลือป่น', baseGrams: 1.5, unit: 'กรัม (1/4 ช้อนชา)' }
        ],
        steps: [
            'อบถั่วพิสตาชิโอที่อุณหภูมิ 160°C เปิดพัดลม 5-10 นาที แล้วนำมาวางพัก 10 นาที',
            'นำถั่วใส่โถปั่น ปั่นให้ละเอียดที่สุดเท่าที่จะทำได้',
            'ใส่น้ำมันรำข้าว ปั่นต่อจนเหลวเนียน',
            'ใส่หัวนมผง น้ำตาลไอซิ่ง และเกลือป่น ปั่นต่อให้เนียนเข้ากันเป็นซอสเนื้อกูแวร์ตัวร์',
            'ใส่ภาชนะปิดสนิท เก็บไว้นอกตู้เย็นได้นาน 1 เดือน'
        ]
    },
    {
        id: 'sub-toffee',
        name: 'Sub-Recipe: Handcrafted Butter Toffee',
        nameTh: 'สูตรน้ำตาลทอฟฟี่เนยสดกรอบ (Butter Toffee 🇫🇷)',
        category: 'sub',
        categoryName: 'ซอส & ท็อปปิ้งทำเอง',
        sweetness: 5,
        yieldBase: 140,
        yieldUnit: 'กรัม',
        origins: ['🇫🇷 ฝรั่งเศส', '🇲🇬 มาดากัสการ์'],
        heroIngredient: 'Glucose Syrup + Whipping Cream 🇫🇷 + Vanilla 🇲🇬 + Sea Salt',
        ingredients: [
            { name: 'น้ำตาลทรายขาวเบเกอรี่', baseGrams: 77.5, unit: 'กรัม' },
            { name: 'น้ำเชื่อมกลูโคส (Glucose Syrup)', baseGrams: 13.75, unit: 'กรัม' },
            { name: 'Whipping Cream แท้ (ฝรั่งเศส 🇫🇷)', baseGrams: 46.25, unit: 'กรัม' },
            { name: 'Vanilla Extract (มาดากัสการ์ 🇲🇬)', baseGrams: 0.6, unit: 'กรัม (1/8 ช้อนชา)' },
            { name: 'ดอกเกลือ (Flaky Sea Salt)', baseGrams: 0.75, unit: 'กรัม' }
        ],
        steps: [
            'นำส่วนผสมทั้งหมดใส่ลงในหม้อหนาขนาดกลาง',
            'ตั้งไฟให้เดือดจนกระทั่งอุณหภูมิได้ 149-154°C คนเป็นครั้งคราว (หลีกเลี่ยงการกวนมากเกินไปเพื่อป้องกัน crystallization)',
            'เทส่วนผสมลงบนกระดาษรองอบ แผ่ให้บาง บนถาดห้องเย็น ช่วยให้ทอฟฟี่กรอบ',
            'เมื่อเย็นสนิท นำไปหักเป็นชิ้นเล็กๆ เก็บในภาชนะสุญญากาศใส่ Silica Gel (เก็บตู้เย็นช่องธรรมดาได้ 2-4 สัปดาห์)'
        ]
    }
];

// Dialogue Database
const dialogues = {
    greetings: [
        {
            title: 'Option A: บททักทายเป็นกันเอง (Casual & Inviting)',
            tag: 'ทักทายลูกค้าใหม่',
            text: '"สวัสดีครับ/ค่ะ! ยินดีต้อนรับสู่ Angie\'s Bakery ครับ/ค่ะ เคยทานคุกกี้ของเรามาก่อน หรือเพิ่งมาเยี่ยมชมร้านเราเป็นครั้งแรกครับ/ค่ะ?"',
            tip: 'ใช้เมื่อลูกค้าเดินเข้ามาในร้านด้วยท่าทางสบายๆ สบตาและยิ้มแย้ม'
        },
        {
            title: 'Option B: บททักทายด้วยกลิ่นหอมอบใหม่ (Scent & Freshness Hook)',
            tag: 'กระตุ้นด้วยความสดใหม่',
            text: '"สวัสดีครับ/ค่ะ! จังหวะดีมากเลยครับ ถาดคุกกี้ [Hazelnut Nutella / Toffee] พึ่งอบเสร็จร้อนๆ กลิ่นหอมฟุ้งเลยครับ! สอบถามหรือให้แนะนำรสชาติได้เลยนะครับ/ค่ะ"',
            tip: 'ใช้เมื่อเตาอบเพิ่งทำงานเสร็จ หรือเมื่อมีกลิ่นเนยหอมตลบอบอวลในร้าน'
        }
    ],
    bestseller: [
        {
            title: 'การแนะนำรสขายดีอันดับ 1 (Crowd-Favorite Hero)',
            tag: 'บอร์ดบัสเซลเลอร์',
            text: '"ตัวขายดีอันดับ 1 ของร้านเราคือ Hazelnut Nutella ครับ! แป้งนุ่มหอมเนยสด สอดไส้นูเทลล่าแท้เยิ้มๆ ตรงกลาง โรยด้วยเฮเซลนัทอบกรอบ 4 ซีก ทานร้อนๆ อร่อยฟินมากครับ"',
            tip: 'เหมาะสำหรับตอบคำถาม "อันไหนขายดีที่สุด?"'
        },
        {
            title: 'การแนะนำสายกูร์เมต์ชอบถั่ว (Gourmet Nut Lover)',
            tag: 'สายถั่วพรีเมียม',
            text: '"ถ้าชอบความหอมมันนัวระดับกูร์เมต์ แนะนำเป็น Pistachio Cookie ครับ! เราใช้ซอสพราลีนพิสตาชิโอที่เคี่ยวเองสดๆ ในร้าน ตัดรสด้วย Ruby Chocolate อมเปรี้ยวเบอร์รี่ หอมนัวลงตัวมากครับ"',
            tip: 'ชูจุดขายพราลีนทำเอง'
        }
    ],
    story: [
        {
            title: 'เรื่องเล่าชูวัตถุดิบระดับโลก (World-Class Chocolate Story)',
            tag: 'วัตถุดิบนำเข้า',
            text: '"คุกกี้ร้านเราพิถีพิถันเรื่องวัตถุดิบมากครับ เราเลือกใช้ผงโกโก้ Cacao Barry Extra Brute 🇫🇷 และดาร์กช็อกโกแลต 58% 🇫🇷 นำเข้าจากฝรั่งเศส คู่กับ Callebaut White & Ruby 🇧🇪 ช็อกโกแลตแท้จากเบลเยียม เนยสดแท้ 100% 🇫🇷 ไร้ไขมันทรานส์ รสชาติจึงเข้มข้นกลมกล่อมไม่เหมือนใครครับ"',
            tip: 'อธิบายเมื่อลูกค้าถามถึงความคุ้มค่าหรือที่มาของรสชาติ'
        }
    ],
    qna: [
        {
            title: 'Q1: คุกกี้หวานมากไหม? (Sweetness Clarification)',
            tag: 'ตอบเรื่องความหวาน',
            text: '"เราปรับสูตรให้หวานน้อยกำลังดีครับ! อย่างตัว Dark Chocolate 58% 🇫🇷 หรือ Pistachio จะเน้นความเข้มข้นของโกโก้ฝรั่งเศส 🇫🇷 และถั่วมันหอม นำความหวานครับ แต่ถ้าชอบไส้เยิ้มหวานนุ่มละมุน แนะนำเป็น Nutella 🇮🇹 ครับ ทานคู่กาแฟดำอร่อยเป๊ะมากครับ"',
            tip: 'อ้างอิงระดับความหวาน Sweetness Meter 1-5 บนป้ายหน้าร้าน'
        },
        {
            title: 'Q2: อุ่นทานที่บ้านอย่างไรให้อร่อยเหมือนเพิ่งออกจากเตา?',
            tag: 'วิธีอุ่นทานที่บ้าน',
            text: '"คุกกี้เก็บไว้ที่อุณหภูมิห้องได้ 3-4 วันครับ เวลาจะทานแนะนำเข้าไมโครเวฟ 10-15 วินาที หรือเตาอบ 160°C ประมาณ 2 นาที ไส้จะเยิ้มและแป้งจะนุ่มเหมือนเพิ่งออกจากเตาเลยครับ!"',
            tip: 'มอบการ์ดคำแนะนำการอุ่นใส่ถุงให้ลูกค้าทุกครั้ง'
        },
        {
            title: 'Q3: คุกกี้เก็บได้นานเท่าไหร่ และควรเก็บรักษาอย่างไร?',
            tag: 'การเก็บรักษา & อายุสินค้า',
            text: '"คุกกี้ของเราเก็บที่อุณหภูมิห้องในภาชนะปิดสนิทได้นาน 5-7 วันครับ หากเก็บในตู้เย็นช่องธรรมดาจะอยู่ได้นาน 2-3 สัปดาห์ หรือแช่ฟรีซได้ถึง 1 เดือนเต็ม เวลาทานแค่นำมาเวฟ 15 วินาที รสชาติและความหอมจะกลับมาสดใหม่ 100% ครับ"',
            tip: 'แนะนำลูกค้าปิดฝากล่องหรือถุงให้สนิทเพื่อป้องกันคุกกี้ดูดความชื้น'
        },
        {
            title: 'Q4: ใช้เนยอะไรทำ? มีไขมันทรานส์ หรือใช้น้ำมันพืช/มาการีนไหม?',
            tag: 'เนยสดแท้ 100% ไร้ไขมันทรานส์',
            text: '"ร้านเราใช้ Pure Salted Butter เนยสดแท้ 100% 🇫🇷 ปราศจากมาการีน และไร้ไขมันทรานส์ (0% Trans Fat) 100% ครับ เราพิถีพิถันเรื่องความปลอดภัยและสุขภาพของลูกค้า ความหอมมันทั้งหมดมาจากเนยนมสดธรรมชาติแท้ๆ ครับ"',
            tip: 'เน้นย้ำเรื่องสุขภาพและความปลอดภัย 0% Trans Fat'
        },
        {
            title: 'Q5: ช็อกโกแลตที่ใช้เป็นช็อกโกแลตแท้ประเภทไหน?',
            tag: 'กูแวร์ตัวร์พรีเมียม',
            text: '"เราใช้ช็อกโกแลตแท้กูแวร์ตัวร์ (Couverture Chocolate) นำเข้า 100% จาก Cacao Barry ประเทศฝรั่งเศส 🇫🇷 และ Callebaut ประเทศเบลเยียม 🇧🇪 ครับ มีปริมาณโกโก้บัตเตอร์แท้สูง ละลายในปาก มอบสัมผัสที่หอมนุ่มลึก ไม่กระด้างเหมือนช็อกโกแลตสังเคราะห์ครับ"',
            tip: 'สร้างความมั่นใจในคุณภาพวัตถุดิบนำเข้าระดับโลก'
        },
        {
            title: 'Q6: มีเมนูสำหรับคนแพ้ถั่ว หรือบริการจัดเซตของขวัญ/เบรคสัมมนาไหม?',
            tag: 'แพ้อาหาร & จัดเลี้ยง',
            text: '"สำหรับลูกค้าแพ้ถั่ว แนะนำรส Red Velvet CC หรือ Double Choc (DCCC) ซึ่งไม่มีส่วนผสมของถั่วครับ ส่วนเรื่องเซตของขวัญหรือ Snack Box จัดเลี้ยง เรามีกล่อง Premium Box 4 ชิ้น และมีราคาสั่งซื้อจำนวนมากสำหรับงานสัมมนา สอบถามโปรโมชั่นพิเศษได้เลยครับ!"',
            tip: 'เสนอบริการ Custom Box และราคาส่งสำหรับงานอีเวนต์'
        },
        {
            title: 'Q7: คุกกี้ของร้านเป็นสไตล์ไหน ต่างจากคุกกี้เนยทั่วไปอย่างไร?',
            tag: 'สัมผัส & เนื้อคุกกี้',
            text: '"คุกกี้ของเราเป็นสไตล์ Artisan Soft-Chewy Cookie (สไตล์อเมริกันคุกกี้ทำมือ) เนื้อสัมผัสจะมีความกรอบนอกนุ่มใน ไส้แน่นเยิ้ม ไม่ใช่คุกกี้เนยแห้งกรอบแบบสไตล์เดนมาร์กครับ ให้มิติความอร่อยฉ่ำเนยสดและช็อกโกแลตแท้แบบเต็มคำครับ"',
            tip: 'อธิบายความแตกต่างของ Texture เพื่อตั้ง expectation ให้ลูกค้า'
        }
    ],
    upsell: [
        {
            title: 'บทปิดขายยกกล่อง (Box Set 4-Pack Upgrade)',
            tag: 'เพิ่มยอดขาย AOV',
            text: '"ถ้าลูกค้าเลือก 2 ชิ้นแล้ว แนะนำรับเพิ่มอีก 2 ชิ้นจัดเป็นเซตกล่อง 4 ชิ้นคละรสได้เลยครับ/ค่ะ คุ้มกว่า แถมมีกล่องสวยงามนำไปฝากคนที่บ้าน หรือเก็บไว้ทานคู่กาแฟเช้าวันพรุ่งนี้ได้ด้วยครับ!"',
            tip: 'ใช้เมื่อลูกค้าเลือก 1-2 ชิ้น'
        }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderFormulas();
    renderDialogue('greetings');
});

// Navigation Controller
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-bakery-100', 'dark:bg-cocoa-800', 'font-bold');
    });

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.classList.remove('hidden');

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) activeNav.classList.add('bg-bakery-100', 'dark:bg-cocoa-800', 'font-bold');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}

// Batch Scaler Engine
function setBatchScale(scale) {
    currentScale = parseFloat(scale);
    document.querySelectorAll('.scale-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-white', 'active');
        btn.classList.add('hover:bg-bakery-200', 'dark:hover:bg-cocoa-800');
    });

    const activeBtn = document.getElementById(`btn-scale-${scale}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-amber-500', 'text-white', 'active');
    }

    document.getElementById('custom-scale-input').value = currentScale;
    renderFormulas();
}

function setCustomScale(val) {
    const scale = parseFloat(val);
    if (!isNaN(scale) && scale > 0) {
        currentScale = scale;
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.classList.remove('bg-amber-500', 'text-white', 'active');
        });
        renderFormulas();
    }
}

// Country Flag Renderer Helper (Ensures crisp high-resolution flag graphics render on all OS / Windows browsers)
function parseFlags(str) {
    if (!str) return '';

    const flags = {
        'fr': '<img src="https://flagcdn.com/20x15/fr.png" srcset="https://flagcdn.com/40x30/fr.png 2x" width="18" height="13.5" alt="ฝรั่งเศส" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">',
        'be': '<img src="https://flagcdn.com/20x15/be.png" srcset="https://flagcdn.com/40x30/be.png 2x" width="18" height="13.5" alt="เบลเยียม" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">',
        'jp': '<img src="https://flagcdn.com/20x15/jp.png" srcset="https://flagcdn.com/40x30/jp.png 2x" width="18" height="13.5" alt="ญี่ปุ่น" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">',
        'it': '<img src="https://flagcdn.com/20x15/it.png" srcset="https://flagcdn.com/40x30/it.png 2x" width="18" height="13.5" alt="อิตาลี" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">',
        'mg': '<img src="https://flagcdn.com/20x15/mg.png" srcset="https://flagcdn.com/40x30/mg.png 2x" width="18" height="13.5" alt="มาดากัสการ์" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">',
        'us': '<img src="https://flagcdn.com/20x15/us.png" srcset="https://flagcdn.com/40x30/us.png 2x" width="18" height="13.5" alt="อเมริกา" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">',
        'au': '<img src="https://flagcdn.com/20x15/au.png" srcset="https://flagcdn.com/40x30/au.png 2x" width="18" height="13.5" alt="ออสเตรเลีย" class="inline-block mx-1 rounded-sm shadow-sm" style="vertical-align: -1px;">'
    };

    let res = str;

    // Replace Unicode flag emojis
    res = res.replace(/🇫🇷/g, flags.fr);
    res = res.replace(/🇧🇪/g, flags.be);
    res = res.replace(/🇯🇵/g, flags.jp);
    res = res.replace(/🇮🇹/g, flags.it);
    res = res.replace(/🇲🇬/g, flags.mg);
    res = res.replace(/🇺🇸/g, flags.us);
    res = res.replace(/🇦🇺/g, flags.au);

    // Replace country names with flag image if flag image is missing
    if (res.includes('ฝรั่งเศส') && !res.includes('fr.png')) res = res.replace(/ฝรั่งเศส/g, 'ฝรั่งเศส ' + flags.fr);
    if (res.includes('เบลเยียม') && !res.includes('be.png')) res = res.replace(/เบลเยียม/g, 'เบลเยียม ' + flags.be);
    if (res.includes('ญี่ปุ่น') && !res.includes('jp.png')) res = res.replace(/ญี่ปุ่น/g, 'ญี่ปุ่น ' + flags.jp);
    if (res.includes('อิตาลี') && !res.includes('it.png')) res = res.replace(/อิตาลี/g, 'อิตาลี ' + flags.it);
    if (res.includes('มาดากัสการ์') && !res.includes('mg.png')) res = res.replace(/มาดากัสการ์/g, 'มาดากัสการ์ ' + flags.mg);
    if (res.includes('อเมริกา') && !res.includes('us.png')) res = res.replace(/อเมริกา/g, 'อเมริกา ' + flags.us);
    if (res.includes('ออสเตรเลีย') && !res.includes('au.png')) res = res.replace(/ออสเตรเลีย/g, 'ออสเตรเลีย ' + flags.au);

    return res;
}

// Formula Renderer
function renderFormulas() {
    const grid = document.getElementById('formulas-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = recipes.filter(r => {
        if (currentCategory === 'all') return true;
        return r.category.includes(currentCategory);
    });

    filtered.forEach(recipe => {
        const scaledYield = Math.round(recipe.yieldBase * currentScale);
        
        let ingredientsHTML = recipe.ingredients.map(ing => {
            const scaledGrams = (ing.baseGrams * currentScale).toLocaleString('th-TH', { maximumFractionDigits: 1 });
            const nameWithFlags = parseFlags(ing.name);
            const hasFlag = /fr\.png|be\.png|jp\.png|it\.png|mg\.png|us\.png|au\.png|🇫🇷|🇧🇪|🇯🇵|🇮🇹|🇲🇬|🇺🇸|🇦🇺|ฝรั่งเศส|เบลเยียม|ญี่ปุ่น|อิตาลี|มาดากัสการ์|อเมริกา|ออสเตรเลีย/.test(ing.name);
            const nameStyle = hasFlag 
                ? 'font-bold text-bakery-900 dark:text-bakery-100' 
                : 'font-medium';
            
            return `
                <tr class="border-b border-bakery-200/50 dark:border-cocoa-800/50 text-xs ${hasFlag ? 'bg-amber-500/10 dark:bg-amber-400/10' : ''}">
                    <td class="py-1.5 px-2 ${nameStyle}">${nameWithFlags}</td>
                    <td class="py-1.5 px-2 text-right font-bold text-amber-700 dark:text-amber-300 whitespace-nowrap">${scaledGrams} ${ing.unit}</td>
                </tr>
            `;
        }).join('');

        let stepsHTML = recipe.steps.map((step, idx) => `
            <li class="text-xs text-bakery-700 dark:text-bakery-300 leading-relaxed flex items-start space-x-2">
                <span class="font-bold text-amber-600 dark:text-amber-400 min-w-[18px]">${idx + 1}.</span>
                <span>${parseFlags(step)}</span>
            </li>
        `).join('');

        const originsBadgeHTML = recipe.origins && recipe.origins.length > 0 ? `
            <div class="flex flex-wrap gap-1.5 pt-1">
                ${recipe.origins.map(o => `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-400/30 shadow-sm">📍 ${parseFlags(o)}</span>`).join('')}
            </div>
        ` : '';

        const card = document.createElement('div');
        card.className = 'recipe-card-gradient rounded-3xl p-6 shadow-lg border border-bakery-300/40 dark:border-cocoa-700/40 space-y-4 hover:shadow-2xl transition duration-300 flex flex-col justify-between';
        
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-start justify-between">
                    <span class="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-500/20 text-amber-800 dark:text-amber-200 rounded-full">
                        ${recipe.categoryName}
                    </span>
                    <span class="text-xs font-semibold text-bakery-500">
                        ⭐️ ความหวาน: ${recipe.sweetness}/5
                    </span>
                </div>

                <div>
                    <h3 class="text-xl font-bold font-serif text-bakery-900 dark:text-bakery-100">${recipe.name}</h3>
                    <div class="text-xs text-amber-700 dark:text-amber-400 font-medium">${recipe.nameTh}</div>
                </div>

                ${originsBadgeHTML}

                <div class="bg-amber-500/10 p-2.5 rounded-xl border border-amber-400/20 text-xs font-medium text-amber-900 dark:text-amber-200 flex items-center justify-between">
                    <span><i class="fa-solid fa-cookie mr-1.5"></i> จำนวนผลลัพธ์ (Yield):</span>
                    <span class="font-bold text-sm">${scaledYield} ${recipe.yieldUnit}</span>
                </div>

                <div class="text-[11px] text-bakery-600 dark:text-bakery-400 italic">
                    <i class="fa-solid fa-star text-amber-400 mr-1"></i> ${parseFlags(recipe.heroIngredient)}
                </div>

                <!-- Ingredients Table -->
                <div class="space-y-1">
                    <div class="text-xs font-bold text-bakery-800 dark:text-bakery-200 border-b border-amber-400/30 pb-1 flex items-center justify-between">
                        <span>ส่วนผสม (Scaled ${currentScale}x):</span>
                        <span class="text-[10px] font-normal text-amber-700 dark:text-amber-300">🌍 มี symbol ประเทศกำกับ</span>
                    </div>
                    <table class="w-full">
                        <tbody>
                            ${ingredientsHTML}
                        </tbody>
                    </table>
                </div>

                <!-- Steps Accordion -->
                <details class="group border border-bakery-200 dark:border-cocoa-800 rounded-xl p-3 bg-white/40 dark:bg-cocoa-900/40">
                    <summary class="text-xs font-bold cursor-pointer flex items-center justify-between text-bakery-800 dark:text-bakery-200">
                        <span><i class="fa-solid fa-list-check mr-1.5 text-amber-500"></i> ขั้นตอนการทำ (${recipe.steps.length} ขั้นตอน)</span>
                        <i class="fa-solid fa-chevron-down text-[10px] transition group-open:rotate-180"></i>
                    </summary>
                    <ol class="mt-3 space-y-2 pl-1 border-t border-bakery-200/40 dark:border-cocoa-800/40 pt-2">
                        ${stepsHTML}
                    </ol>
                </details>
            </div>

            <div class="pt-4 border-t border-bakery-200/50 dark:border-cocoa-800/50 flex items-center justify-between">
                <button onclick="copyRecipeSummary('${recipe.id}')" class="text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline inline-flex items-center">
                    <i class="fa-solid fa-copy mr-1"></i> คัดลอกสูตรนี้
                </button>
                <button onclick="window.print()" class="text-xs text-bakery-500 hover:text-bakery-800 dark:hover:text-bakery-200">
                    <i class="fa-solid fa-print"></i> พิมพ์
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function filterFormulas(cat) {
    currentCategory = cat;
    document.querySelectorAll('.formula-filter-btn').forEach(btn => {
        btn.classList.remove('bg-bakery-800', 'dark:bg-bakery-200', 'text-white', 'dark:text-bakery-900', 'active');
        btn.classList.add('bg-bakery-100', 'dark:bg-cocoa-800', 'text-bakery-800', 'dark:text-bakery-200');
    });
    event.target.classList.add('bg-bakery-800', 'dark:bg-bakery-200', 'text-white', 'dark:text-bakery-900', 'active');
    renderFormulas();
}

function searchFormulas() {
    const q = document.getElementById('search-formulas').value.toLowerCase();
    const cards = document.querySelectorAll('#formulas-grid > div');
    
    recipes.forEach((r, idx) => {
        const text = (r.name + r.nameTh + r.heroIngredient + r.ingredients.map(i => i.name).join(' ')).toLowerCase();
        if (cards[idx]) {
            cards[idx].style.display = text.includes(q) ? 'flex' : 'none';
        }
    });
}

// Dialogue Renderer
function renderDialogue(groupKey) {
    dialogueCategory = groupKey;
    const container = document.getElementById('dialogue-container');
    if (!container) return;

    // Highlight active sidebar button if buttons exist
    document.querySelectorAll('.dialogue-tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500/20', 'text-amber-800', 'dark:text-amber-200', 'font-bold');
    });
    const activeBtn = document.getElementById(`dialogue-btn-${groupKey}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-amber-500/20', 'text-amber-800', 'dark:text-amber-200', 'font-bold');
    }

    container.innerHTML = '';
    const list = dialogues[groupKey] || [];

    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-panel p-6 rounded-3xl space-y-3 relative border-l-4 border-amber-500 shadow-md hover:shadow-xl transition';
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold px-2.5 py-1 bg-amber-500/20 text-amber-800 dark:text-amber-200 rounded-full">${item.tag}</span>
                <button onclick="copyText('${escapeQuotes(item.text)}')" class="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                    <i class="fa-solid fa-copy mr-1"></i> คัดลอกบทพูด
                </button>
            </div>
            <h4 class="font-bold text-base text-bakery-900 dark:text-bakery-100">${parseFlags(item.title)}</h4>
            <div class="bg-white/80 dark:bg-cocoa-900/80 p-4 rounded-2xl border border-bakery-200 dark:border-cocoa-700 text-sm leading-relaxed text-bakery-800 dark:text-bakery-200 font-medium shadow-inner">
                ${parseFlags(item.text)}
            </div>
            <div class="text-xs text-bakery-500 italic">
                💡 <strong>คำแนะนำพนักงาน:</strong> ${item.tip}
            </div>
        `;
        container.appendChild(card);
    });
}

function showDialogueGroup(groupKey) {
    renderDialogue(groupKey);
}

// Helper Utilities
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('คัดลอกข้อความเรียบร้อยแล้ว!');
    });
}

function copyRecipeSummary(id) {
    const r = recipes.find(item => item.id === id);
    if (!r) return;

    const scaledYield = Math.round(r.yieldBase * currentScale);
    let summary = `🍪 ${r.name} (${r.nameTh})\n`;
    summary += `ขนาดแบทช์: ${currentScale}x | ผลลัพธ์: ${scaledYield} ${r.yieldUnit}\n\nส่วนผสม:\n`;
    
    r.ingredients.forEach(i => {
        const grams = (i.baseGrams * currentScale).toLocaleString('th-TH', { maximumFractionDigits: 1 });
        summary += `- ${i.name}: ${grams} ${i.unit}\n`;
    });

    navigator.clipboard.writeText(summary).then(() => {
        showToast(`คัดลอกสูตร ${r.name} (${currentScale}x) เรียบร้อย!`);
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = msg;
    toast.classList.remove('hidden', 'translate-y-4', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2500);
}
