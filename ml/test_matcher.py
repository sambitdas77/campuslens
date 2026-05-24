from matcher import match_opportunities

print("TEST 1 — ML student profile")
r = match_opportunities(["python", "machine learning"], ["ai"], "ml")
assert len(r) > 0, "Should return results"
assert r[0]['match_score'] > r[-1]['match_score'], "Should be sorted descending"
print(f"  PASS — {len(r)} results, top score: {r[0]['match_score']}%")

print("\nTEST 2 — Web dev profile")
r = match_opportunities(["react", "javascript", "node.js"], ["web development"], "web")
assert len(r) > 0
print(f"  PASS — {len(r)} results, top: {r[0]['title']}")

print("\nTEST 3 — Empty skills")
r = match_opportunities([], [], "ml")
print(f"  PASS — handled gracefully, {len(r)} results")

print("\nTEST 4 — Unknown domain")
r = match_opportunities(["python"], ["cooking"], "food")
print(f"  PASS — {len(r)} results returned")

print("\nAll tests passed.")