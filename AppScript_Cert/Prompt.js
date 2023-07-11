function Prompt() {
  var ui = DocumentApp.getUi();
  var htmlOutput = HtmlService.createHtmlOutput(`
    <style>
      .modal-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 175vh;
        width: 350px;
        background-color: #EDEADE;
      }
      img {
        display: flex;
        height: 150px;
        width: 150px;
        position: relative;
        top: 200px;
        left: 100px;
        
      }
      .form-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 350px;
      }

      .form-field {
        margin-bottom: 10px;
        text-align: center;
      }

      .form-field label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #333333;
      }

      .form-field input {
        width: 100%;
        padding: 8px;
        border: 1px solid #cccccc;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
        justify-content: center;
        text-align: center;
        max-width: 300px;
      }

      .form-field input:focus {
        border-color: #4caf50;
      }

      .submit-button {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      .submit-button button {
        background-color: #4caf50;
        color: #ffffff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
    </style>
    <img src="https://cdn.discordapp.com/attachments/905241590509998100/1128354543189622834/AA_-_MAIN_NO_BG_NO_BLUR.png">

    <div class="modal-container">
      <div class="form-container">
        <div class="form-field">
          <label for="discordID">Candidates Discord ID:</label>
          <input type="text" id="discordID" />
        </div>
        <div class="form-field">
          <label for="robloxName">Candidates Roblox Name:</label>
          <input type="text" id="robloxName" />
        </div>
        <div class="form-field">
          <label for="discordName">Candidates Discord Name:</label>
          <input type="text" id="discordName" />
        </div>
        <div class="form-field">
          <label for="score">Candidates Score:</label>
          <input type="text" id="score" />
        </div>
        <div class="form-field">
          <label for="inviligatorName">Inviligator's Discord Name:</label>
          <input type="text" id="inviligatorName" />
        </div>
        <div class="form-field">
          <label for="inviligatorID">Inviligator's Discord ID:</label>
          <input type="text" id="inviligatorID" />
        </div>
        <div class="form-field">
          <label for="modCommandName">Moderation Command's Name:</label>
          <input type="text" id="modCommandName" />
        </div>
        <div class="submit-button">
          <button onclick="submitForm()">Submit</button>
        </div>
      </div>
    </div>

    <script> 
      function submitForm() {
        var formElements = document.getElementsByTagName("input");
        var response = {};

        for (var i = 0; i < formElements.length; i++) {
          var element = formElements[i];
          response[element.id] = element.value;
        }

        google.script.run.promptFormResponse(response);
        google.script.host.close();
      }
    </script>
  `).setWidth(400).setHeight(600);

  ui.showModalDialog(htmlOutput, "Please Enter Details");
}

function promptFormResponse(response) {
  var CandidateID = response.discordID;
  var CandidateRobloxName = response.robloxName;
  var CandidateDiscordName = response.discordName;
  var CandidateScore = response.score;
  var TotalScore = 26;
  var CompareScore = parseInt(CandidateScore);
  var Grade;

  if (CompareScore === 26) {
    Grade = "S";
  } else if (CompareScore <= 25 && CompareScore >= 23) {
    Grade = "A";
  } else if (CompareScore <= 23 && CompareScore >= 22) {
    Grade = "B";
  } else if (CompareScore <= 21 && CompareScore >= 19) {
    Grade = "C";
  } else if (CompareScore <= 18) {
    Grade = "Failed";
  }

  var InviligatorDiscordName = response.inviligatorName;
  var InviligatorDiscordID = response.inviligatorID;
  var ModCommandName = response.modCommandName;
  var today = new Date();
  var formattedToday = Utilities.formatDate(today, "GMT", "dd/MM/yyyy");

  var documentId = DriveApp.getFileById("16aHBanoZcYb5o9CMxx5bur3GyXuIOvVUZANAkoYqz5Q").makeCopy().getId();
  var docFile = DriveApp.getFileById(documentId);
  docFile.setName(CandidateDiscordName + "_" + formattedToday + "_Moderator Certificate");

  var doc = DocumentApp.openById(documentId);
  var body = doc.getBody();

  var searchReplaceText = {
    "##CDiscordID##": CandidateID,
    "##date##": formattedToday,
    "##CRoName##": CandidateRobloxName,
    "##CDcName##": CandidateDiscordName,
    "##Score##": CompareScore,
    "##Total##": TotalScore,
    "##Outcome##": Grade,
    "##InName##": InviligatorDiscordName,
    "##InDcID##": InviligatorDiscordID,
    "##MCName##": ModCommandName,
    "##InSignature##": InviligatorDiscordName,
    "##MCSignature##": ModCommandName
  };

  for (var searchValue in searchReplaceText) {
    var replaceValue = searchReplaceText[searchValue];
    if (replaceValue !== undefined) {
      body.replaceText(searchValue, replaceValue.toString());
    }
  }
}
