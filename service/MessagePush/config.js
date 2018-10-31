const httpConfig = {
    options : {
        hostname: 'oapi.dingtalk.com',
        path: '/robot/send?access_token=a934542f5f04bc0641091b71f123c0f872fe04427da8839ede50194c081b4430',
        method: 'POST',
        agent: false,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    },
    raw:
    {
        "msgtype": "text",
        "text": {
            "content": "test"
        },
        "at": {
            "atMobiles": [

            ],
            "isAtAll": false
        }
    }
}

module.exports = httpConfig;
