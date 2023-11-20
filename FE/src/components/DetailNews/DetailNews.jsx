import React from 'react'
import Styles from './DetailNews.module.css'
function DetailNews(
    {
        detail_title = 'Nội dung 1',
        detail_date= "09/11/2023",
        detail_img = 'newsImage_2.jpg'
    }
) {
    return (
        <div className={Styles.detailNews}>
            <div className={Styles.detailNews_title}>
                {detail_title}
            </div>

            <div className={Styles.detailNews_date}>
                Ngày đăng:{detail_date}
            </div>

            <div className={Styles.detailNews_img}>
                <img src={`./images/News/${detail_img}`} alt="" style={{height:'500px'}}/>
            </div>

            <div className={Styles.detailNews_des}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nobis labore saepe sed a accusamus distinctio! Hic dignissimos quasi, aliquid, odio quo earum modi deserunt sed, voluptates dolorem voluptas quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta culpa beatae et facere iure id impedit, voluptates numquam nemo voluptatibus rerum odit delectus accusamus, quasi vero. Doloremque, optio aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, impedit ratione! Consequuntur, voluptate. Dolore explicabo voluptas pariatur exercitationem. Labore ad ipsum pariatur praesentium optio veniam quo nihil incidunt nam quaerat.   
            </div>
        </div>
    )
}

export default DetailNews