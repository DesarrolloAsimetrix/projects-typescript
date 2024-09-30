#!/bin/bash

# Base URL for the logos
base_url="https://cdn.nba.com/logos/nba"
suffix="/global/L/logo.svg"

# Start and end of the ID range (NBA team IDs)
start_id=1610612737
end_id=1610612766

# Loop through the range of IDs
team_counter=1
for ((id=$start_id; id<=$end_id; id++)); do
  url="${base_url}/${id}${suffix}"
  file_name="team_${team_counter}.svg"

  echo "Downloading logo for team $team_counter from $url..."

  # Download the logo
  curl -o "$file_name" "$url"

  # Check if the download was successful
  if [ $? -eq 0 ]; then
    echo "Downloaded and saved as $file_name"
  else
    echo "Failed to download $url"
  fi

  # Increment the team counter
  ((team_counter++))
done

echo "All logos have been downloaded."

