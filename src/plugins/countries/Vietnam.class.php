<?php

/**
 * @package Countries
 */

class Country_Vietname extends CountryPlugin
{
	protected $continent = "asia";
	protected $countryName = "Socialist Republic of Vietnam";
	protected $countrySlug = "VN";
	protected $regionNames = "Provinces"; // + 5 Municipalities which are the 5 largest cities

	protected $extendedData = array(
		// the general zip format for the country. This may be optionally overridden for each region if a more
		// specific format is desired. To prevent duplicate code, the replacements listed here cover ALL zip formats
		// for each province
		"zipFormat" => array(
			"format" => "%*****",
			"replacements" => array(
				"%" => "123456789",
				"*" => "0123456789",
			)
		),

		// the general phone format and area codes for the country
		// https://en.wikipedia.org/wiki/Telephone_numbers_in_Vietnam
		"phoneFormat" => array(
			"areaCodes" => array(
                               203, 204, 205, 206, 207, 208, 209,   // Landlines
                210, 211, 212, 213, 214, 215, 216,      218, 219,
                220, 221, 222,           225, 226, 227, 228, 229,
                          232, 233, 234, 235, 236, 237, 238, 239,
                          242, 243, 244, 245, 246, 247, 248,
                     251, 252,      254, 255, 256, 257, 258, 259,
                260, 261, 262, 263,                          269,
                270, 271, 272, 273, 274, 275, 276, 277, 278, 279,
                          282, 283, 284, 285, 286, 287,
                290, 291, 292, 293, 294,      296, 297,      299,
			),
			"displayFormats" => array(
				"(AAA) Xxx-xxxx",
				"+84 AAAXxxxxxx",
				"+84 (AAA) Xxx-xxxx", // Outside Vietnam use 84 as Country Calling Code
				"+84-AAA-Xxx-xxxx"
			)
		)
	);

    // our country-wide data, with info separated into regions
    // https://en.wikipedia.org/wiki/Vietnam
	protected $countryData = array(
        // Red River Delta
        array(
			"regionName" => "Bắc Ninh",
			"regionShort" => "Bắc Ninh",
			"regionSlug" => "bac_ninh",
			"weight" => 1,
			"cities" => array(
                "Bắc Ninh", "Từ Sơn", "Hồ", "Phố Mới", "Lim", "Chờ", "Gia Bình", "Thứa"
            ),
		),
		array(
			"regionName" => "Hà Nam",
			"regionShort" => "Hà Nam",
			"regionSlug" => "ha_nam",
			"weight" => 1,
			"cities" => array(
                "Phủ Lý", "Bình Mỹ", "Hòa Mạc", "Quế", "Vĩnh Trụ", "Kiện Khê"
            ),
		),
		array(
			"regionName" => "Hải Dương",
			"regionShort" => "Hải Dương",
			"regionSlug" => "hai_duong",
			"weight" => 1,
			"cities" => array(
                "Hải Dương", "Chí Linh", "Kẻ Sặt", "Lai Cách", "Gia Lộc", "Phú Thái", "Kinh Môn", "Nam Sách",
                 "Ninh Giang", "Thanh Hà", "Thanh Miện", "Tứ Kỳ",
            ),
		),
		array(
			"regionName" => "Hưng Yên",
			"regionShort" => "Hưng Yên",
			"regionSlug" => "hung_yen",
			"weight" => 1,
			"cities" => array(
                "Hưng Yên", "Mỹ Hào", "Ân Thi", "Khoái Châu", "Lương Bằng", "Trần Cao", "Vương", "Văn Giang",
                "Như Quỳnh", "Yên Mỹ",
            ),
		),
		array(
			"regionName" => "Nam Định",
			"regionShort" => "Nam Định",
			"regionSlug" => "nam_dinh",
			"weight" => 1,
			"cities" => array(
                "Nam Định", "Ngô Đồng", "Yên Định", "Mỹ Lộc", "Nam Giang", "Liễu Đề", "Cổ Lễ", "Gôi",
                "Xuân Trường", "Lâm",
            ),
		),
		array(
			"regionName" => "Ninh Bình",
			"regionShort" => "Ninh Bình",
			"regionSlug" => "ninh_binh",
			"weight" => 1,
			"cities" => array(
                "Ninh Bình", "Tam Điệp", "Me", "Thiên Tôn", "Phát Diệm", "Nho Quan", "Yên Ninh", "Yên Thịnh",
            ),
		),
		array(
			"regionName" => "Thái Bình",
			"regionShort" => "Thái Bình",
			"regionSlug" => "thai_binh",
			"weight" => 1,
			"cities" => array(
                "Thái Bình", "Vũ Thư", "Tiền Hải", "Diêm Điền", "Quỳnh Côi", "Thanh Nê", "Hưng Hà", "Đông Hưng",
            ),
		),
		array(
			"regionName" => "Vĩnh Phúc",
			"regionShort" => "Vĩnh Phúc",
			"regionSlug" => "vinh_phuc",
			"weight" => 1,
			"cities" => array(
                "Vĩnh Yên", "Phúc Yên", "Yên Lạc", "Vĩnh Tường", "Hợp Hòa", "Tam Đảo", "Hoa Sơn", "Hương Canh",
            ),
		),
		array(
			"regionName" => "Hà Nội",
			"regionShort" => "Hà Nội",
			"regionSlug" => "ha_noi_city",
			"weight" => 1,
			"cities" => array("Hà Nội"),
		),
		array(
			"regionName" => "Hải Phòng",
			"regionShort" => "Hải Phòng",
			"regionSlug" => "hai_phong_city",
			"weight" => 1,
			"cities" => array("Hải Phòng"),
        ),
        
        // Northeast Region
		array(
			"regionName" => "Bắc Giang",
			"regionShort" => "Bắc Giang",
			"regionSlug" => "bac_giang",
			"weight" => 1,
            "cities" => array("Bắc Giang"),
		),
		array(
			"regionName" => "Bắc Kạn",
			"regionShort" => "Bắc Kạn",
			"regionSlug" => "bac_kan",
			"weight" => 1,
            "cities" => array("Bắc Kạn"),
		),
		array(
			"regionName" => "Cao Bằng",
			"regionShort" => "Cao Bằng",
			"regionSlug" => "cao_bang",
			"weight" => 1,
            "cities" => array("Cao Bằng"),
		),
		array(
			"regionName" => "Hà Giang",
			"regionShort" => "Hà Giang",
			"regionSlug" => "ha_giang",
			"weight" => 1,
            "cities" => array("Hà Giang"),
		),
		array(
			"regionName" => "Lạng Sơn",
			"regionShort" => "Lạng Sơn",
			"regionSlug" => "lang_son",
			"weight" => 1,
            "cities" => array("Lạng Sơn"),
		),
		array(
			"regionName" => "Lào Cai",
			"regionShort" => "Lào Cai",
			"regionSlug" => "lao_cai",
			"weight" => 1,
            "cities" => array("Lào Cai"),
		),
		array(
			"regionName" => "Phú Thọ",
			"regionShort" => "Phú Thọ",
			"regionSlug" => "phu_tho",
			"weight" => 1,
            "cities" => array("Việt Trì"),
		),
		array(
			"regionName" => "Quảng Ninh",
			"regionShort" => "Quảng Ninh",
			"regionSlug" => "quang_ninh",
			"weight" => 1,
            "cities" => array("Hạ Long"),
		),
		array(
			"regionName" => "Thái Nguyên",
			"regionShort" => "Thái Nguyên",
			"regionSlug" => "thai_nguyen",
			"weight" => 1,
            "cities" => array("Thái Nguyên"),
		),
		array(
			"regionName" => "Tuyên Quang",
			"regionShort" => "Tuyên Quang",
			"regionSlug" => "tuyen_quang",
			"weight" => 1,
            "cities" => array("Tuyên Quang"),
		),
		array(
			"regionName" => "Yên Bái",
			"regionShort" => "Yên Bái",
			"regionSlug" => "yen_bai",
			"weight" => 1,
            "cities" => array("Yên Bái", "Nghĩa Lộ"),
        ),
        
        // Northwest Region
		array(
			"regionName" => "Điện Biên",
			"regionShort" => "Điện Biên",
			"regionSlug" => "dien_bien",
			"weight" => 1,
			"cities" => array(
                "Điện Biên Phủ", "Mường Lay",
            ),
		),
		array(
			"regionName" => "Hòa Bình",
			"regionShort" => "Hòa Bình",
			"regionSlug" => "hoa_binh",
			"weight" => 1,
			"cities" => array(
                "Hòa Bình", "Cao Phong", "Bo", "Kỳ Sơn",
            ),
		),
		array(
			"regionName" => "Lai Châu",
			"regionShort" => "Lai Châu",
			"regionSlug" => "lai_chau",
			"weight" => 1,
			"cities" => array(
                "Lai Châu", "Mường Tè", "Nậm Nhùn", "Phong Thổ", "Sìn Hồ", "Tam Đường", "Tân Uyên", "Than Uyên",
            ),
		),
		array(
			"regionName" => "Sơn La",
			"regionShort" => "Sơn La",
			"regionSlug" => "son_la",
			"weight" => 1,
			"cities" => array(
                "Sơn La", "Bắc Yên", "Hát Lót", "Mộc Châu", "Ong", "Phú Yên", "Quỳnh Nhai", "Sông Mã",
                "Sốp Cộp", "Thuận Châu", "Yên Châu",
            ),
        ),
        
        // North Central Coast
		array(
			"regionName" => "Hà Tĩnh",
			"regionShort" => "Hà Tĩnh",
			"regionSlug" => "ha_tinh",
			"weight" => 1,
			"cities" => array("Hà Tĩnh"),
		),
		array(
			"regionName" => "Nghệ An",
			"regionShort" => "Nghệ An",
			"regionSlug" => "nghe_an",
			"weight" => 1,
			"cities" => array("Vinh"),
		),
		array(
			"regionName" => "Quảng Bình",
			"regionShort" => "Quảng Bình",
			"regionSlug" => "quang_binh",
			"weight" => 1,
			"cities" => array("Đồng Hới"),
		),
		array(
			"regionName" => "Quảng Trị",
			"regionShort" => "Quảng Trị",
			"regionSlug" => "quang_tri",
			"weight" => 1,
			"cities" => array("Đông Hà"),
		),
		array(
			"regionName" => "Thanh Hóa",
			"regionShort" => "Thanh Hóa",
			"regionSlug" => "thanh_hoa",
			"weight" => 1,
			"cities" => array("Thanh Hóa"),
		),
		array(
			"regionName" => "Thừa Thiên–Huế",
			"regionShort" => "Thừa Thiên–Huế",
			"regionSlug" => "thua_thien-hue",
			"weight" => 1,
			"cities" => array("Huế"),
        ),
        
        // Central Highlands
		array(
			"regionName" => "Đắk Lắk",
			"regionShort" => "Đắk Lắk",
			"regionSlug" => "dak_lak",
			"weight" => 1,
			"cities" => array("Buôn Ma Thuột"),
		),
		array(
			"regionName" => "Đắk Nông",
			"regionShort" => "Đắk Nông",
			"regionSlug" => "dak_nong",
			"weight" => 1,
			"cities" => array("Gia Nghĩa"),
		),
		array(
			"regionName" => "Gia Lai",
			"regionShort" => "Gia Lai",
			"regionSlug" => "gia_lai",
			"weight" => 1,
			"cities" => array("Pleiku"),
		),
		array(
			"regionName" => "Kon Tum",
			"regionShort" => "Kon Tum",
			"regionSlug" => "kon_tum",
			"weight" => 1,
			"cities" => array("Kon Tum"),
		),
		array(
			"regionName" => "Lâm Đồng",
			"regionShort" => "Lâm Đồng",
			"regionSlug" => "lam_dong",
			"weight" => 1,
			"cities" => array("Da Lat"),
        ),
        
        // South Central Coast
		array(
			"regionName" => "Bình Định",
			"regionShort" => "Bình Định",
			"regionSlug" => "binh_dinh",
			"weight" => 1,
			"cities" => array("Quy Nhơn"),
		),
		array(
			"regionName" => "Bình Thuận",
			"regionShort" => "Bình Thuận",
			"regionSlug" => "binh_thuan",
			"weight" => 1,
			"cities" => array("Phan Thiết"),
		),
		array(
			"regionName" => "Khánh Hòa",
			"regionShort" => "Khánh Hòa",
			"regionSlug" => "khanh_hoa",
			"weight" => 1,
			"cities" => array("Nha Trang"),
		),
		array(
			"regionName" => "Ninh Thuận",
			"regionShort" => "Ninh Thuận",
			"regionSlug" => "ninh_thuan",
			"weight" => 1,
			"cities" => array("Phan Rang–Tháp Chàm"),
		),
		array(
			"regionName" => "Phú Yên",
			"regionShort" => "Phú Yên",
			"regionSlug" => "phu_yen",
			"weight" => 1,
			"cities" => array("Tuy Hòa"),
		),
		array(
			"regionName" => "Quảng Nam",
			"regionShort" => "Quảng Nam",
			"regionSlug" => "quang_nam",
			"weight" => 1,
			"cities" => array("Tam Kỳ"),
		),
		array(
			"regionName" => "Quảng Ngãi",
			"regionShort" => "Quảng Ngãi",
			"regionSlug" => "quang_ngai",
			"weight" => 1,
			"cities" => array("	Quảng Ngãi"),
		),
		array(
			"regionName" => "Đà Nẵng",
			"regionShort" => "Đà Nẵng",
			"regionSlug" => "da_nang_city",
			"weight" => 1,
			"cities" => array("Đà Nẵng"),
        ),
        
        // Southeast
		array(
			"regionName" => "Bà Rịa–Vũng Tàu",
			"regionShort" => "Bà Rịa–Vũng Tàu",
			"regionSlug" => "ba_ria-vung_tau",
			"weight" => 1,
			"cities" => array("Quảng Ngãi"),
		),
		array(
			"regionName" => "Bình Dương",
			"regionShort" => "Bình Dương",
			"regionSlug" => "binh_duong",
			"weight" => 1,
			"cities" => array("Thủ Dầu Một"),
		),
		array(
			"regionName" => "Bình Phước",
			"regionShort" => "Bình Phước",
			"regionSlug" => "binh_phuoc",
			"weight" => 1,
			"cities" => array("Đồng Xoài"),
		),
		array(
			"regionName" => "Đồng Nai",
			"regionShort" => "Đồng Nai",
			"regionSlug" => "dong_nai",
			"weight" => 1,
			"cities" => array("Biên Hòa"),
		),
		array(
			"regionName" => "Tây Ninh",
			"regionShort" => "Tây Ninh",
			"regionSlug" => "tag_ninh",
			"weight" => 1,
			"cities" => array("Tây Ninh"),
		),
		array(
			"regionName" => "Hồ Chí Minh City",
			"regionShort" => "Hồ Chí Minh City",
			"regionSlug" => "ho_chi_minh_city",
			"weight" => 1,
			"cities" => array("Hồ Chí Minh City"),
        ),
        
        // Mekong Delta
		array(
			"regionName" => "An Giang",
			"regionShort" => "An Giang",
			"regionSlug" => "an_giang",
			"weight" => 1,
			"cities" => array("Long Xuyên"),
		),
		array(
			"regionName" => "Bạc Liêu",
			"regionShort" => "Bạc Liêu",
			"regionSlug" => "bac_lieu",
			"weight" => 1,
			"cities" => array("Bạc Liêu"),
		),
		array(
			"regionName" => "Bến Tre",
			"regionShort" => "Bến Tre",
			"regionSlug" => "ben_tre",
			"weight" => 1,
			"cities" => array("Bến Tre"),
		),
		array(
			"regionName" => "Cà Mau",
			"regionShort" => "Cà Mau",
			"regionSlug" => "ca_mau",
			"weight" => 1,
			"cities" => array("Cà Mau"),
		),
		array(
			"regionName" => "Đồng Tháp",
			"regionShort" => "Đồng Tháp",
			"regionSlug" => "dong_thap",
			"weight" => 1,
			"cities" => array("Cao Lãnh"),
		),
		array(
			"regionName" => "Hậu Giang",
			"regionShort" => "Hậu Giang",
			"regionSlug" => "hau_giang",
			"weight" => 1,
			"cities" => array("Vị Thanh"),
		),
		array(
			"regionName" => "Kiên Giang",
			"regionShort" => "Kiên Giang",
			"regionSlug" => "kien_giang",
			"weight" => 1,
			"cities" => array("Rạch Giá"),
		),
		array(
			"regionName" => "Long An",
			"regionShort" => "Long An",
			"regionSlug" => "long_an",
			"weight" => 1,
			"cities" => array("Tân An"),
		),
		array(
			"regionName" => "Sóc Trăng",
			"regionShort" => "Sóc Trăng",
			"regionSlug" => "soc_trang",
			"weight" => 1,
			"cities" => array("Sóc Trăng"),
		),
		array(
			"regionName" => "Tiền Giang",
			"regionShort" => "Tiền Giang",
			"regionSlug" => "tien_gian",
			"weight" => 1,
			"cities" => array("Mỹ Tho"),
		),
		array(
			"regionName" => "Trà Vinh",
			"regionShort" => "Trà Vinh",
			"regionSlug" => "tra_vinh",
			"weight" => 1,
			"cities" => array("Trà Vinh"),
		),
		array(
			"regionName" => "Vĩnh Long",
			"regionShort" => "Vĩnh Long",
			"regionSlug" => "vinh_long",
			"weight" => 1,
			"cities" => array("Vĩnh Long"),
		),
		array(
			"regionName" => "Cần Thơ",
			"regionShort" => "Cần Thơ",
			"regionSlug" => "can_tho",
			"weight" => 1,
			"cities" => array("Cần Thơ"),
		),
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
