import React from 'react';
import { motion } from 'framer-motion';

const christmasHistory = [
  {
    id: 1,
    year: '4 TCN',
    title: 'Sự ra đời của Chúa Jesus',
    content: 'Chúa Jesus được sinh ra tại Bethlehem. Đây được xem là sự kiện khởi nguồn của Giáng sinh, mặc dù ngày chính xác không được ghi nhận trong Kinh Thánh.',
    image: 'https://cdnmedia.baotintuc.vn/Upload/XjfgEPYM30O8z6jY3MHxSw/files/2021/12/2212/chua.jpg'

  },
  {
    id: 2,
    year: '274',
    title: 'Lễ hội Sol Invictus',
    content: 'Hoàng đế La Mã Aurelian thiết lập ngày 25/12 là ngày lễ Sol Invictus (Thần Mặt Trời bất khả chiến bại), sau này trở thành ngày Giáng sinh.',
    image: 'https://httlvn.org/wp-content/uploads/2023/12/Picture1.jpg'
  },
  {
    id: 3,
    year: '336',
    title: 'Giáng sinh chính thức',
    content: 'Lần đầu tiên trong lịch sử, Giáo hội La Mã chính thức công nhận ngày 25/12 là ngày Giáng sinh, đánh dấu sự khởi đầu của việc kỷ niệm ngày này.',
    image: 'https://www.mykingdom.com.vn/cdn/shop/articles/mykingdom-le-hoi-giang-sinh.jpg?v=1686034338'
  },
  {
    id: 4,
    year: '350',
    title: 'Thánh Nicholas và truyền thống tặng quà',
    content: 'Thánh Nicholas, giám mục thành Myra, nổi tiếng với việc tặng quà cho người nghèo. Ngài trở thành nguồn cảm hứng cho hình tượng ông già Noel.',
    image: 'https://rikisport.vn/wp-content/uploads/2024/12/5.-Thanh-Nicholas-Va-Nhung-Gia-Tri-Dao-Duc-Ma-Ngai-De-Lai.jpg'
  },
  {
    id: 5,
    year: '1223',
    title: 'Máng cỏ Giáng sinh đầu tiên',
    content: 'Thánh Francis of Assisi tạo ra máng cỏ Giáng sinh đầu tiên tại Greccio, Italy, khởi đầu cho truyền thống trang trí máng cỏ trong dịp Giáng sinh.',
    image: 'https://mancoichihoavn.com/wp-content/uploads/2020/02/115711-107785744vrugbtds-large.jpg'
  },
  {
    id: 6,
    year: '1510',
    title: 'Cây thông Giáng sinh',
    content: 'Truyền thống trang trí cây thông Noel bắt đầu ở Latvia và Estonia. Các thương nhân Đức sau đó phổ biến phong tục này khắp châu Âu.',
    image: 'https://nguoilaodongvn.com/wp-content/uploads/2021/10/hinh-anh-cay-thong-noel-ruc-ro-trong-dem-1024x640.jpeg'
  },
  {
    id: 7,
    year: '1823',
    title: 'Ông già Noel hiện đại',
    content: 'Bài thơ "A Visit from St. Nicholas" (Đêm trước Giáng sinh) của Clement Clarke Moore tạo nên hình ảnh ông già Noel với 8 chú tuần lộc.',
    image: 'https://cdn.nguyenkimmall.com/images/detailed/225/ong-gia-noel.jpg'
  },
  {
    id: 8,
    year: '1843',
    title: 'Thiệp Giáng sinh đầu tiên',
    content: 'Thiệp Giáng sinh đầu tiên được Sir Henry Cole thiết kế và in ấn tại London, khởi đầu cho truyền thống gửi thiệp chúc mừng Giáng sinh.',
    image: 'https://adminvov1.vov.gov.vn/UploadImages/vov1/2019/thang_11/oldchristmascardhirez.jpg?w=1000'
  },
  {
    id: 9,
    year: '1931',
    title: 'Ông già Noel áo đỏ',
    content: 'Coca-Cola tạo ra hình ảnh ông già Noel mặc áo đỏ trong chiến dịch quảng cáo, góp phần định hình hình tượng ông già Noel như ngày nay.',
    image: 'https://vcdn1-dulich.vnecdn.net/2020/12/12/12-1607594216-3126-1607594603-3531-9252-1607735598.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=lCsjXbq_oJXCmc741iMNAQ'
  },
  {
    id: 10,
    year: 'Hiện đại',
    title: 'Giáng sinh toàn cầu',
    content: 'Giáng sinh trở thành lễ hội toàn cầu, kết hợp giữa ý nghĩa tôn giáo và văn hóa đại chúng, là dịp để gia đình sum họp và trao gửi yêu thương.',
    image: 'https://mediamart.vn/images/uploads/2022/ac8c317a-fb79-4236-9a2b-3f36a3021966.png'
  }
];

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-christmas text-christmas-red text-center mb-12"
        >
          Lịch Sử Giáng Sinh
        </motion.h1>

        <div className="space-y-12">
          {christmasHistory.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 space-y-4 flex flex-col justify-center">
                  <div className="inline-block bg-christmas-red/10 rounded-full px-4 py-2">
                    <h2 className="font-christmas text-3xl text-christmas-red">
                      {item.year}
                    </h2>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.content}</p>
                </div>
                <div className="relative h-full min-h-[300px]">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent mix-blend-overlay" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 