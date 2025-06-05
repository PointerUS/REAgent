# Real Estate Chatbot

A chatbot API for real estate inquiries using the agno framework. This chatbot can help with property searches, property valuations, and mortgage calculations.

## Features

- **Property Search**: Find properties based on location, type, and features
- **Property Valuation**: Estimate property values based on various factors
- **Mortgage Calculator**: Calculate mortgage payments and provide loan information
- **Intelligent Routing**: Automatically routes queries to the appropriate specialized agent

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/real-estate-chatbot.git
cd real-estate-chatbot
```

2. Install dependencies:
```bash
pip install fastapi uvicorn agno
```

3. Run the application:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

### GET /
Returns a welcome message and information about available endpoints.

### GET /agents
Lists all available agent types.

### POST /chat
Send messages to the chatbot and receive responses.

#### Request Body
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Your message here"
    }
  ],
  "agent_type": "router"  // Optional: "router", "search", "valuation", or "mortgage"
}
```

#### Response
```json
{
  "response": "Response from the chatbot"
}
```

## Example Usage

### Property Search

```json
{
  "messages": [
    {
      "role": "user",
      "content": "I'm looking for a house in the suburbs with 4 bedrooms"
    }
  ]
}
```

### Property Valuation

```json
{
  "messages": [
    {
      "role": "user",
      "content": "How much is a 1200 sq ft condo in beachfront worth?"
    }
  ]
}
```

### Mortgage Calculation

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Calculate mortgage payment for a $300,000 loan at 4.5% interest for 30 years"
    }
  ]
}
```

## Agent Types

- **router**: The default agent that routes queries to specialized agents
- **search**: Property search agent
- **valuation**: Property valuation agent
- **mortgage**: Mortgage calculator agent

You can specify the agent type in the request to bypass the router and directly use a specialized agent.

## Development

### Project Structure

- `main.py`: FastAPI application and endpoints
- `agents/`: Directory containing all agent implementations
  - `base_agent.py`: Base class for all real estate agents
  - `property_search_agent.py`: Agent for property searches
  - `property_valuation_agent.py`: Agent for property valuations
  - `mortgage_calculator_agent.py`: Agent for mortgage calculations
  - `agent_factory.py`: Factory for creating and managing agents

### Adding New Agents

To add a new agent:

1. Create a new agent class that extends `BaseRealEstateAgent`
2. Implement the `process` method to handle user messages
3. Add the new agent to the `RealEstateAgentFactory` class
4. Update the router's keywords to route to the new agent

## License

MIT# REAgent
