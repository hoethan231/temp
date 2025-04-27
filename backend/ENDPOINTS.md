# Endpoints

## 📞 Call Transcript Endpoints

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | `/calls/` | Create a call transcript |
| GET | `/calls/` | List all call transcripts |
| GET | `/calls/{id}` | Get a specific transcript |
| POST | `/calls/{id}/analyze` | Analyze transcript for emergencies |


---

## 🚨 Emergency Endpoints

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | `/emergencies/` | Create an emergency |
| GET | `/emergencies/` | List all emergencies |
| GET | `/emergencies/{id}` | Get a specific emergency |
| PATCH | `/emergencies/{id}` | Update an emergency |
| DELETE | `/emergencies/{id}` | Delete an emergency |
| POST | `/emergencies/{id}/add_call/{call_id}` | Link a call to an emergency |
| POST | `/emergencies/{id}/remove_call/{call_id}` | Unlink a call from an emergency |
| POST | `/emergencies/{id}/merge/{other_id}` | Merge two emergencies |


---

## 📝 Notes

- Replace `{id}`, `{call_id}`, and `{other_id}` with the actual object IDs.
- All endpoints return JSON responses.
- Authentication and error handling are not shown here; implement as needed.

---

Let me know if you want a version with example payloads or responses!

