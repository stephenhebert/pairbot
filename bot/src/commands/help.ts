export default async function({ ack }) {
  await ack({
    "blocks": [
      {
        "type": "rich_text",
        "elements": [
          {
            "type": "rich_text_section",
            "elements": [
              {
                "type": "text",
                "text": "You can use these commands to interact:\n"
              }
            ]
          },
          {
            "type": "rich_text_list",
            "style": "bullet",
            "elements": [
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": "/pairbot enroll - sign up to be paired "
                  }
                ]
              },
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": "/pairbot leave - take a break from the pairing"
                  }
                ]
              },
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": "/pairbot status - request a status report"
                  }
                ]
              },
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": "/pairbot announce - ask pairbot to say hello"
                  }
                ]
              },
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": "/pairbot help - display a list of commands"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    response_type: "ephemeral",
  })
}
