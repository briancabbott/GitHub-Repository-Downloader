Topic
A topic aggregates entities that are related to a subject.

Implements
Node
Starrable
Connections
stargazers (StargazerConnection!)
A list of users who have starred this starrable.

Argument	Type	Description
after	String	
Returns the elements in the list that come after the specified cursor.

before	String	
Returns the elements in the list that come before the specified cursor.

first	Int	
Returns the first n elements from the list.

last	Int	
Returns the last n elements from the list.

orderBy	StarOrder	
Order for connection

Fields
id (ID!)
name (String!)
The topic's name.

relatedTopics ([Topic!]!)
A list of related topics, including aliases of this topic, sorted with the most relevant first.

viewerHasStarred (Boolean!)
Returns a boolean indicating whether the viewing user has starred this starrable.