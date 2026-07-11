#!/usr/bin/env python3
import os
import subprocess
import sys
import json
import urllib.request

API_KEY = os.environ.get("LINEAR_API_KEY")

# Fallback to macOS Keychain if not set in environment
if not API_KEY and sys.platform == "darwin":
    try:
        API_KEY = subprocess.check_output(
            ["security", "find-generic-password", "-w", "-s", "Linear API Key"],
            text=True
        ).strip()
    except Exception:
        pass

TEAM_ID = "e53b9f72-c372-4bf6-bfe4-8dd343900f90"
DONE_STATE_ID = "b2f061dc-077c-451a-a997-faa51e68aa06"

URL = "https://api.linear.app/graphql"

def query_linear(query, variables=None):
    if not API_KEY:
        print("Error: LINEAR_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)
    headers = {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
    }
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    data = json.dumps(payload).encode()
    req = urllib.request.Request(URL, data=data, headers=headers)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())

def create_and_done(title, description):
    # 1. Create Issue in Backlog/Todo
    create_mutation = """
    mutation CreateIssue($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue {
          id
          identifier
          title
        }
      }
    }
    """
    create_vars = {
        "input": {
            "title": title,
            "description": description,
            "teamId": TEAM_ID
        }
    }
    
    res = query_linear(create_mutation, create_vars)
    if not res.get("data", {}).get("issueCreate", {}).get("success"):
        print(f"Error creating issue: {res}")
        return None
        
    issue = res["data"]["issueCreate"]["issue"]
    issue_id = issue["id"]
    identifier = issue["identifier"]
    print(f"Created issue {identifier}: {issue['title']}")
    
    # 2. Mark Issue as Done
    update_mutation = """
    mutation UpdateIssue($id: String!, $input: IssueUpdateInput!) {
      issueUpdate(id: $id, input: $input) {
        success
        issue {
          id
          identifier
          state {
            name
          }
        }
      }
    }
    """
    update_vars = {
        "id": issue_id,
        "input": {
            "stateId": DONE_STATE_ID
        }
    }
    
    res_update = query_linear(update_mutation, update_vars)
    if res_update.get("data", {}).get("issueUpdate", {}).get("success"):
        print(f"✓ Closed issue {identifier} as DONE.")
    else:
        print(f"Error updating issue state: {res_update}")
        
    return identifier

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 linear_helper.py <title> <description>")
        sys.exit(1)
    create_and_done(sys.argv[1], sys.argv[2])
