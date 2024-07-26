## 1. Hosting a group

  1.1 Author: Matthew Stewardson
  
  1.2 Description: A logged in user selects a game and then selects that they want to host a group and find other users for that game. They       select the groups settings to find the kinds of users they are looking for. The host now has the option to wait for more users until the     group is full or cancel the search and carry on with the amount of players in the group. The host can also cancel the group all together.
  
  1.3 Actor(s):
  
  1. Host User: This user is the one that is creating the group and looking for others.
  2. User(s): This user is the on that is matched with the host user to fill their group.
  
  1.4 Preconditions: 
  1. The host user must be logged in.
  2. The host user selected a game.
  3. The host user selected to host.
  4. The user(s) must be logged in.
  5. The user(s) must have selected a game.
  6. The user(s) must have chosen to find a group.
  7. The user(s) can manage their settings in their account page for the game they are looking for.
  
  1.5 Successful Post Conditions: 
  1. The host user has matched with a full team.
  2. The host user has cancled their search for other users.
  3. The host user did not wait for more than 10 minutes.

  1.6 Applicable Business Rules:
  1. User(s) must be a valid account.
  
  1.7 Main Flow:
  |   | Host User | System |
  | - |--------- |  ------------ | 
  | 1 |Selects the game they want to find other users for| System prompts user to see if they want to host, search, or cancel (*A1)*|
  | 2 |Selects that they want to host the group| System saves selection then prompts user to select game platform (*A1)*|
  | 3 |Selects the platform that the game is on (depends on the game)| System saves selection then prompts user for group size (*A1)*|
  | 4 |Selects the group size (depends on the game)| System saves selection then prompts for communication type (*A1)*|
  | 5 |Selects the communication type| System saves selection then prompts for search options (depending on the game, different options well be shown) (*A1)*|
  | 6 |Selects options tailored to each game (depends on the game)| System saves selection then prompts user to begin the search (*A1)*|
  | 7 |Selects "Begin Search" to start the search for other users| System now searchs for other players that match the desired results of the host (*A1)* (*A2)*|
  | 8 |Users are found and the team is now full| System cancels the search for more users|
  | 9 |The user(s) now can "Ready Up" to confirm they are ready which tells the system everyone is ready| System displays join information for all non host users (*A1)*|
  
  1.8 Alternate Flows:
  |     | Name of Actor(s) | Description |
  | --  |--------- |  ------------ | 
  | A1  | Selects to cancel | System wipes the users selection and brings them to the home page|
  | A2  | Host could not find more players | Not enough users are found within a set time, search cancels|
        


## 2. Creating a clan

  2.1 Author: Michal Kot-Kawula
  
  2.2 Description: A logged in user selects to create a clan. They automatically become clan leader and fill in the form with the clan's name, description, preferred banner. A clan with a unique name will be created and clan leader will be able to add clan members. The clan leader will have an option to edit clan name, description, banner, users and relegate their status to another member within the same clan. A clan member can create a match date event with the required positions for the match for other members to join. Any clan member can leave the clan whenver they want.
  
  2.3 Actor(s):
  
  1. Site member: Creates a new clan.
  2. Clan leader: Leader sets clan details and adds members.

  2.4 Preconditions: 
  1. Site member must be logged in.

  2.5 Successful Post Conditions: 
  1. Site member created clan.
  3. Clan leader added member.

  
  2.6 Applicable Business Rules:
  1. Site member must be a valid account.
  2. Site member must be clan members to create events.

  2.7 Main Flow:
  |   | Clan Leader |  System |
  | - |--------- |   ---------|
  | 1 | Select to create a clan| Prompt to set information, and set user as clan leader (*A1)* |
  | 2 | Set the clan's unique name, description, banner, rules|  Saved clan information|
  | 3 | Search for new clan member by keyword|  Matche user according to keyword search, and prompt found (*A2)*|
  | 4 | Add new members to clan|  Saves new members to clan (*A3)*|

  
  2.8 Alternate Flows:
  |     | Clan Leader | Description |
  | --  |--------- |  ------------ | 
  | A1  | Clan name already taken| Each clan name should be unique|
  | A2  | User not found | No username mached keyword search|
  | A3  | Maximum number of memebers | Clan member limit is set to 50 members |
  
  
  ## 3. Admin starting a Poll
  
  3.1 Author: Harrison Siddhattha Dhammaviriya
  
  3.2 Description: A Site Administrator Creates a Poll for the user to decide which of the next game will be supported by this site. First the Admin will create a poll and decide on its title. Afterwards the admin will decide on how many games (up to 5) will be in the poll as the options. And then the admin decide on how long the poll will last from 2 weeks up to a month. The system will then output a confirmation message with the detail of the poll and ask if its what they wanted. If the admin click yes, then the poll will be up for the user to vote up until the timer expires.
  
  3.3 Actor(s):
  
  1. Site Administrator

  3.4 Precondition(s):
  
  1. Admin is logged in
  2. No Poll is currently ongoing

  3.5 Succesful Post Conditions:
  
  1. Site Administrator Create a Poll
  2. Title and Choices are shown
  3. User can vote on one of the options
  4. Poll is Voteable as long as Timer is still ongoing

  3.6 Applicable Business Rule:
  
  1. Can only be created by a Site Administrator
  2. Deadline is shown

  3.7 Main Flow:
  |   | Site Administrator | System |
  | - |--------- | ---------|
  | 1 | Create a Poll | Create a new poll and prompt for the Poll Title|
  | 2 | Input Title | Enter the Inputted Title then shows 5 empty text box for choices |
  | 3 | Input Choices (Min 2, Max 5) | Ask the Admin to select the duration of the poll (*A1)* |
  | 4 | Select how long the duration would be | Display the Poll information and ask for confirmation |
  | 5 | Confirm Poll information | Display new poll on the home screen for every user (*A2)* |
  
  3.8 Alternate Flow:
  |     | Alternate Flow | Description |
  | --  |--------- |  ------------ | 
  | A1  | Only 1 choice is Inputted | Minimum of 2 Option is inputted |
  | A2  | Admin made a mistake and want to make changes | Go back to mainflow 2 with answer already inputted for every prompts |
