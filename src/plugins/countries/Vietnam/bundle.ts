import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	continent: 'asia',
	countrySlug: 'VN',
	regionNames: i18n.regionNames, // + 5 Municipalities which are the 5 largest cities

	extendedData: {
		// the general zip format for the country. This may be optionally overridden for each region if a more
		// specific format is desired. To prevent duplicate code, the replacements listed here cover ALL zip formats
		// for each province
		zipFormat: {
			format: '%*****',
			replacements: {
				'%': '123456789',
				'*': '0123456789',
			}
		},

		// the general phone format and area codes for the country
		// https://en.wikipedia.org/wiki/Telephone_numbers_in_Vietnam
		phoneFormat: {
			areaCodes: [
				203, 204, 205, 206, 207, 208, 209,   // Landlines
				210, 211, 212, 213, 214, 215, 216, 218, 219,
				220, 221, 222, 225, 226, 227, 228, 229,
				232, 233, 234, 235, 236, 237, 238, 239,
				242, 243, 244, 245, 246, 247, 248,
				251, 252, 254, 255, 256, 257, 258, 259,
				260, 261, 262, 263, 269,
				270, 271, 272, 273, 274, 275, 276, 277, 278, 279,
				282, 283, 284, 285, 286, 287,
				290, 291, 292, 293, 294, 296, 297, 299
			],
			displayFormats: [
				'(AAA) Xxx-xxxx',
				'+84 AAAXxxxxxx',
				'+84 (AAA) Xxx-xxxx', // Outside Vietnam use 84 as Country Calling Code
				'+84-AAA-Xxx-xxxx'
			]
		}
	},

    // our country-wide data, with info separated into regions
    // https://en.wikipedia.org/wiki/Vietnam
	regions: [
        // Red River Delta
        {
			regionName: 'Bắc Ninh',
			regionShort: 'Bắc Ninh',
			regionSlug: 'bac_ninh',
			weight: 1,
			cities: [
                'Bắc Ninh', 'Từ Sơn', 'Hồ', 'Phố Mới', 'Lim', 'Chờ', 'Gia Bình', 'Thứa'
            ]
		},
		{
			regionName: 'Hà Nam',
			regionShort: 'Hà Nam',
			regionSlug: 'ha_nam',
			weight: 1,
			cities: [
                'Phủ Lý', 'Bình Mỹ', 'Hòa Mạc', 'Quế', 'Vĩnh Trụ', 'Kiện Khê'
            ]
		},
		{
			regionName: 'Hải Dương',
			regionShort: 'Hải Dương',
			regionSlug: 'hai_duong',
			weight: 1,
			cities: [
                'Hải Dương', 'Chí Linh', 'Kẻ Sặt', 'Lai Cách', 'Gia Lộc', 'Phú Thái', 'Kinh Môn', 'Nam Sách',
                 'Ninh Giang', 'Thanh Hà', 'Thanh Miện', 'Tứ Kỳ'
			]
		},
		{
			regionName: 'Hưng Yên',
			regionShort: 'Hưng Yên',
			regionSlug: 'hung_yen',
			weight: 1,
			cities: [
                'Hưng Yên', 'Mỹ Hào', 'Ân Thi', 'Khoái Châu', 'Lương Bằng', 'Trần Cao', 'Vương', 'Văn Giang',
                'Như Quỳnh', 'Yên Mỹ'
			]
		},
		{
			regionName: 'Nam Định',
			regionShort: 'Nam Định',
			regionSlug: 'nam_dinh',
			weight: 1,
			cities: [
                'Nam Định', 'Ngô Đồng', 'Yên Định', 'Mỹ Lộc', 'Nam Giang', 'Liễu Đề', 'Cổ Lễ', 'Gôi',
                'Xuân Trường', 'Lâm'
			]
		},
		{
			regionName: 'Ninh Bình',
			regionShort: 'Ninh Bình',
			regionSlug: 'ninh_binh',
			weight: 1,
			cities: [
                'Ninh Bình', 'Tam Điệp', 'Me', 'Thiên Tôn', 'Phát Diệm', 'Nho Quan', 'Yên Ninh', 'Yên Thịnh'
			]
		},
		{
			regionName: 'Thái Bình',
			regionShort: 'Thái Bình',
			regionSlug: 'thai_binh',
			weight: 1,
			cities: [
                'Thái Bình', 'Vũ Thư', 'Tiền Hải', 'Diêm Điền', 'Quỳnh Côi', 'Thanh Nê', 'Hưng Hà', 'Đông Hưng',
			]
		},
		{
			regionName: 'Vĩnh Phúc',
			regionShort: 'Vĩnh Phúc',
			regionSlug: 'vinh_phuc',
			weight: 1,
			cities: [
                'Vĩnh Yên', 'Phúc Yên', 'Yên Lạc', 'Vĩnh Tường', 'Hợp Hòa', 'Tam Đảo', 'Hoa Sơn', 'Hương Canh',
			]
		},
		{
			regionName: 'Hà Nội',
			regionShort: 'Hà Nội',
			regionSlug: 'ha_noi_city',
			weight: 1,
			cities: ['Hà Nội']
		},
		{
			regionName: 'Hải Phòng',
			regionShort: 'Hải Phòng',
			regionSlug: 'hai_phong_city',
			weight: 1,
			cities: ['Hải Phòng']
        },

        // Northeast Region
		{
			regionName: 'Bắc Giang',
			regionShort: 'Bắc Giang',
			regionSlug: 'bac_giang',
			weight: 1,
            cities: ['Bắc Giang']
		},
		{
			regionName: 'Bắc Kạn',
			regionShort: 'Bắc Kạn',
			regionSlug: 'bac_kan',
			weight: 1,
            cities: ['Bắc Kạn']
		},
		{
			regionName: 'Cao Bằng',
			regionShort: 'Cao Bằng',
			regionSlug: 'cao_bang',
			weight: 1,
            cities: ['Cao Bằng']
		},
		{
			regionName: 'Hà Giang',
			regionShort: 'Hà Giang',
			regionSlug: 'ha_giang',
			weight: 1,
            cities: ['Hà Giang']
		},
		{
			regionName: 'Lạng Sơn',
			regionShort: 'Lạng Sơn',
			regionSlug: 'lang_son',
			weight: 1,
            cities: ['Lạng Sơn']
		},
		{
			regionName: 'Lào Cai',
			regionShort: 'Lào Cai',
			regionSlug: 'lao_cai',
			weight: 1,
            cities: ['Lào Cai']
		},
		{
			regionName: 'Phú Thọ',
			regionShort: 'Phú Thọ',
			regionSlug: 'phu_tho',
			weight: 1,
            cities: ['Việt Trì']
		},
		{
			regionName: 'Quảng Ninh',
			regionShort: 'Quảng Ninh',
			regionSlug: 'quang_ninh',
			weight: 1,
            cities: ['Hạ Long']
		},
		{
			regionName: 'Thái Nguyên',
			regionShort: 'Thái Nguyên',
			regionSlug: 'thai_nguyen',
			weight: 1,
            cities: ['Thái Nguyên']
		},
		{
			regionName: 'Tuyên Quang',
			regionShort: 'Tuyên Quang',
			regionSlug: 'tuyen_quang',
			weight: 1,
            cities: ['Tuyên Quang']
		},
		{
			regionName: 'Yên Bái',
			regionShort: 'Yên Bái',
			regionSlug: 'yen_bai',
			weight: 1,
            cities: ['Yên Bái', 'Nghĩa Lộ']
        },

        // Northwest Region
		{
			regionName: 'Điện Biên',
			regionShort: 'Điện Biên',
			regionSlug: 'dien_bien',
			weight: 1,
			cities: [
                'Điện Biên Phủ', 'Mường Lay'
			]
		},
		{
			regionName: 'Hòa Bình',
			regionShort: 'Hòa Bình',
			regionSlug: 'hoa_binh',
			weight: 1,
			cities: [
                'Hòa Bình', 'Cao Phong', 'Bo', 'Kỳ Sơn'
			]
		},
		{
			regionName: 'Lai Châu',
			regionShort: 'Lai Châu',
			regionSlug: 'lai_chau',
			weight: 1,
			cities: [
                'Lai Châu', 'Mường Tè', 'Nậm Nhùn', 'Phong Thổ', 'Sìn Hồ', 'Tam Đường', 'Tân Uyên', 'Than Uyên'
			]
		},
		{
			regionName: 'Sơn La',
			regionShort: 'Sơn La',
			regionSlug: 'son_la',
			weight: 1,
			cities: [
                'Sơn La', 'Bắc Yên', 'Hát Lót', 'Mộc Châu', 'Ong', 'Phú Yên', 'Quỳnh Nhai', 'Sông Mã',
                'Sốp Cộp', 'Thuận Châu', 'Yên Châu'
			]
        },

        // North Central Coast
		{
			regionName: 'Hà Tĩnh',
			regionShort: 'Hà Tĩnh',
			regionSlug: 'ha_tinh',
			weight: 1,
			cities: ['Hà Tĩnh']
		},
		{
			regionName: 'Nghệ An',
			regionShort: 'Nghệ An',
			regionSlug: 'nghe_an',
			weight: 1,
			cities: ['Vinh']
		},
		{
			regionName: 'Quảng Bình',
			regionShort: 'Quảng Bình',
			regionSlug: 'quang_binh',
			weight: 1,
			cities: ['Đồng Hới']
		},
		{
			regionName: 'Quảng Trị',
			regionShort: 'Quảng Trị',
			regionSlug: 'quang_tri',
			weight: 1,
			cities: ['Đông Hà']
		},
		{
			regionName: 'Thanh Hóa',
			regionShort: 'Thanh Hóa',
			regionSlug: 'thanh_hoa',
			weight: 1,
			cities: ['Thanh Hóa']
		},
		{
			regionName: 'Thừa Thiên–Huế',
			regionShort: 'Thừa Thiên–Huế',
			regionSlug: 'thua_thien-hue',
			weight: 1,
			cities: ['Huế']
        },

        // Central Highlands
		{
			regionName: 'Đắk Lắk',
			regionShort: 'Đắk Lắk',
			regionSlug: 'dak_lak',
			weight: 1,
			cities: ['Buôn Ma Thuột']
		},
		{
			regionName: 'Đắk Nông',
			regionShort: 'Đắk Nông',
			regionSlug: 'dak_nong',
			weight: 1,
			cities: ['Gia Nghĩa']
		},
		{
			regionName: 'Gia Lai',
			regionShort: 'Gia Lai',
			regionSlug: 'gia_lai',
			weight: 1,
			cities: ['Pleiku']
		},
		{
			regionName: 'Kon Tum',
			regionShort: 'Kon Tum',
			regionSlug: 'kon_tum',
			weight: 1,
			cities: ['Kon Tum']
		},
		{
			regionName: 'Lâm Đồng',
			regionShort: 'Lâm Đồng',
			regionSlug: 'lam_dong',
			weight: 1,
			cities: ['Da Lat']
        },

        // South Central Coast
		{
			regionName: 'Bình Định',
			regionShort: 'Bình Định',
			regionSlug: 'binh_dinh',
			weight: 1,
			cities: ['Quy Nhơn']
		},
		{
			regionName: 'Bình Thuận',
			regionShort: 'Bình Thuận',
			regionSlug: 'binh_thuan',
			weight: 1,
			cities: ['Phan Thiết']
		},
		{
			regionName: 'Khánh Hòa',
			regionShort: 'Khánh Hòa',
			regionSlug: 'khanh_hoa',
			weight: 1,
			cities: ['Nha Trang']
		},
		{
			regionName: 'Ninh Thuận',
			regionShort: 'Ninh Thuận',
			regionSlug: 'ninh_thuan',
			weight: 1,
			cities: ['Phan Rang–Tháp Chàm']
		},
		{
			regionName: 'Phú Yên',
			regionShort: 'Phú Yên',
			regionSlug: 'phu_yen',
			weight: 1,
			cities: ['Tuy Hòa']
		},
		{
			regionName: 'Quảng Nam',
			regionShort: 'Quảng Nam',
			regionSlug: 'quang_nam',
			weight: 1,
			cities: ['Tam Kỳ']
		},
		{
			regionName: 'Quảng Ngãi',
			regionShort: 'Quảng Ngãi',
			regionSlug: 'quang_ngai',
			weight: 1,
			cities: ['Quảng Ngãi']
		},
		{
			regionName: 'Đà Nẵng',
			regionShort: 'Đà Nẵng',
			regionSlug: 'da_nang_city',
			weight: 1,
			cities: ['Đà Nẵng']
        },

        // Southeast
		{
			regionName: 'Bà Rịa–Vũng Tàu',
			regionShort: 'Bà Rịa–Vũng Tàu',
			regionSlug: 'ba_ria-vung_tau',
			weight: 1,
			cities: ['Quảng Ngãi']
		},
		{
			regionName: 'Bình Dương',
			regionShort: 'Bình Dương',
			regionSlug: 'binh_duong',
			weight: 1,
			cities: ['Thủ Dầu Một']
		},
		{
			regionName: 'Bình Phước',
			regionShort: 'Bình Phước',
			regionSlug: 'binh_phuoc',
			weight: 1,
			cities: ['Đồng Xoài']
		},
		{
			regionName: 'Đồng Nai',
			regionShort: 'Đồng Nai',
			regionSlug: 'dong_nai',
			weight: 1,
			cities: ['Biên Hòa']
		},
		{
			regionName: 'Tây Ninh',
			regionShort: 'Tây Ninh',
			regionSlug: 'tag_ninh',
			weight: 1,
			cities: ['Tây Ninh']
		},
		{
			regionName: 'Hồ Chí Minh City',
			regionShort: 'Hồ Chí Minh City',
			regionSlug: 'ho_chi_minh_city',
			weight: 1,
			cities: ['Hồ Chí Minh City']
        },

        // Mekong Delta
		{
			regionName: 'An Giang',
			regionShort: 'An Giang',
			regionSlug: 'an_giang',
			weight: 1,
			cities: ['Long Xuyên']
		},
		{
			regionName: 'Bạc Liêu',
			regionShort: 'Bạc Liêu',
			regionSlug: 'bac_lieu',
			weight: 1,
			cities: ['Bạc Liêu']
		},
		{
			regionName: 'Bến Tre',
			regionShort: 'Bến Tre',
			regionSlug: 'ben_tre',
			weight: 1,
			cities: ['Bến Tre']
		},
		{
			regionName: 'Cà Mau',
			regionShort: 'Cà Mau',
			regionSlug: 'ca_mau',
			weight: 1,
			cities: ['Cà Mau']
		},
		{
			regionName: 'Đồng Tháp',
			regionShort: 'Đồng Tháp',
			regionSlug: 'dong_thap',
			weight: 1,
			cities: ['Cao Lãnh']
		},
		{
			regionName: 'Hậu Giang',
			regionShort: 'Hậu Giang',
			regionSlug: 'hau_giang',
			weight: 1,
			cities: ['Vị Thanh']
		},
		{
			regionName: 'Kiên Giang',
			regionShort: 'Kiên Giang',
			regionSlug: 'kien_giang',
			weight: 1,
			cities: ['Rạch Giá']
		},
		{
			regionName: 'Long An',
			regionShort: 'Long An',
			regionSlug: 'long_an',
			weight: 1,
			cities: ['Tân An']
		},
		{
			regionName: 'Sóc Trăng',
			regionShort: 'Sóc Trăng',
			regionSlug: 'soc_trang',
			weight: 1,
			cities: ['Sóc Trăng']
		},
		{
			regionName: 'Tiền Giang',
			regionShort: 'Tiền Giang',
			regionSlug: 'tien_gian',
			weight: 1,
			cities: ['Mỹ Tho']
		},
		{
			regionName: 'Trà Vinh',
			regionShort: 'Trà Vinh',
			regionSlug: 'tra_vinh',
			weight: 1,
			cities: ['Trà Vinh']
		},
		{
			regionName: 'Vĩnh Long',
			regionShort: 'Vĩnh Long',
			regionSlug: 'vinh_long',
			weight: 1,
			cities: ['Vĩnh Long']
		},
		{
			regionName: 'Cần Thơ',
			regionShort: 'Cần Thơ',
			regionSlug: 'can_tho',
			weight: 1,
			cities: ['Cần Thơ']
		}
	]
});
