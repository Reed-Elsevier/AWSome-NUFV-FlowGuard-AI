import os
from pathlib import Path
from typing import Dict, Optional
import duckdb
from backend.app.config import settings

class DataConnection:
    _instance: Optional["DataConnection"] = None
    _con: Optional[duckdb.DuckDBPyConnection] = None
    _table_paths: Dict[str, str] = {}

    REQUIRED_TABLES = [
        "process_event_log",
        "process_definitions",
        "process_activities",
        "automation_candidates",
        "access_requests",
        "access_request_approvals",
        "ai_use_cases",
        "ai_use_case_kpis"
    ]

    OPTIONAL_TABLES = [
        "ai_governance_reviews"
    ]

    def __init__(self):
        self._con = duckdb.connect(database=":memory:", read_only=False)
        self._discover_and_register_tables()

    @classmethod
    def get_instance(cls) -> "DataConnection":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    @property
    def connection(self) -> duckdb.DuckDBPyConnection:
        if self._con is None:
            self._con = duckdb.connect(database=":memory:", read_only=False)
            self._discover_and_register_tables()
        return self._con

    def _discover_and_register_tables(self):
        data_root = Path(settings.DATA_ROOT).resolve()
        if not data_root.exists():
            raise FileNotFoundError(f"Data root directory does not exist: {data_root}")

        # Search recursively for each parquet file
        found_paths = {}
        for file_path in data_root.rglob("*.parquet"):
            stem = file_path.stem
            found_paths[stem] = str(file_path).replace("\\", "/")

        self._table_paths = found_paths

        # Check required tables
        missing_tables = [tbl for tbl in self.REQUIRED_TABLES if tbl not in self._table_paths]
        if missing_tables:
            raise FileNotFoundError(
                f"Missing required dataset(s): {', '.join(missing_tables)}. "
                f"Expected location: {data_root}/<file>.parquet or subdirectories."
            )

        # Register views for each table for clean SQL
        for tbl_name, file_path in self._table_paths.items():
            try:
                self._con.execute(f"CREATE OR REPLACE VIEW {tbl_name} AS SELECT * FROM read_parquet('{file_path}')")
            except Exception as e:
                print(f"[Warning] Failed to create view for {tbl_name} ({file_path}): {e}")

    def get_table_path(self, table_name: str) -> str:
        if table_name in self._table_paths:
            return self._table_paths[table_name]
        raise KeyError(f"Table '{table_name}' was not found in data directory.")

def get_db() -> duckdb.DuckDBPyConnection:
    return DataConnection.get_instance().connection
