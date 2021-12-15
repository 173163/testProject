module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "chrome": "49",
                    "ios": "10"
                }
            }
        ]
    ],
    "plugins": [
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es/components", "style": false }]
    ]

}